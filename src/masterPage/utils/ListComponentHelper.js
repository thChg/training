import _ from "lodash";
import moment from "moment";
import { normalizeUriForRequest, sendRequest } from "./CommonHelper";
import { DATA_TYPE } from "../../constants/dataType";
import { HTTP_METHOD } from "../../constants/httpMethod";

export function initListComponent(self, props) {
  const { functionName, data, apiEndpoint } = props;
  const title = getTableTitleFromModel(data);
  self.state = {
    functionName,

    data: {
      title,

      objectList: [],
      searchResult: null,

      currentPage: 1,
      recordPerPage: 30,
      selectedRecords: [],
      length: 0,
    },

    apiEndpoint,
  };

  self.fetchObjectList = fetchObjectList.bind(self, self);
  self.onPageSelect = onPageSelect.bind(self, self);
  self.onSetRecordPerPage = onSetRecordPerPage.bind(self, self);
}

export async function loadListComponentData(self) {
  try {
    const { objectList, length, accessList } = await fetchObjectList(self);

    self.setState((prevState) => ({
      data: {
        ...prevState.data,
        objectList,
        length,
      },
      accessList,
    }));
  } catch (error) {
    console.error(error);
  }
}

async function fetchObjectList(self) {
  const { apiEndpoint, data } = self.state;
  const { object, query } = self.props.data;
  const objectSchema = Object.entries(object);
  const { value: select, sortBy } = query;
  const { currentPage: page, recordPerPage: limit } = data;

  try {
    const normalizedUri = normalizeUriForRequest(apiEndpoint, {
      page,
      limit,
      select,
      sortBy,
    });
    const response = await sendRequest(HTTP_METHOD.GET, normalizedUri);

    const { objectList, length, accessList } = response.data;
    const normalizedObjectList = objectList.map((o) => {
      return objectSchema.reduce((acc, [key, value]) => {
        if (value.type === DATA_TYPE.TIME) {
          acc[key] = moment(o[key]).format("YYYY-MM-DD HH:mm");
        } else {
          acc[key] = o[key];
        }
        return acc;
      }, {});
    });
    return { objectList: normalizedObjectList, length, accessList };
  } catch (error) {
    console.error(error);
  }
}

async function onPageSelect(self, event) {
  try {
    const { currentPage } = self.state.data;
    const { value } = event.target;

    if (Number(value) === Number(currentPage)) return;

    const newData = _.cloneDeep(self.state.data);

    newData.currentPage = value;

    await self.setState({ data: newData }, async () => {
      const { objectList, length } = await fetchObjectList(self);

      newData.objectList = objectList;
      newData.length = length;

      self.setState({ data: newData });
    });
  } catch (error) {
    console.error(error);
  }
}

async function onSetRecordPerPage(self, event) {
  const { recordPerPage } = self.state.data;
  const { value } = event.target;

  if (Number(value) === Number(recordPerPage)) return;

  const newData = _.cloneDeep(self.state.data);

  newData.recordPerPage = value;
  newData.currentPage = 1;

  await self.setState({ data: newData }, async () => {
    const { objectList, length } = await fetchObjectList(self);

    newData.objectList = objectList;
    newData.length = length;

    self.setState({ data: newData });
  });
}

function getTableTitleFromModel(data) {
  console.log(data);
  return _.compact(
    Object.entries(data.object).map(
      ([key, value]) =>
        data.query.value.includes(key) &&
        key !== "_id" && {
          titleName: _.startCase(key),
          clickable: value.clickable || false,
          canQuery: value.canQuery || false,
        }
    )
  );
}
