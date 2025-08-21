import _ from "lodash";
import { normalizeUriForRequest, sendRequest } from "../../../masterPage/utils/CommonHelper";
import { QUERY_MODEL } from "../../../constants/userFeature";
import { HTTP_METHOD } from "../../../constants/httpMethod";

export function onSelectActionCode(self, event) {
  const { pageLoad, data } = self.state;
  const { serviceId } = data;
  const { value } = event.target;
  const { objectList: serviceList } = pageLoad.serviceId.data;

  const selectedService = serviceList.find((s) => s.serviceId === serviceId);
  const selectedAction = selectedService.actionList.find(
    (a) => a.actionCode === value
  );
  const { actionCode, method, path } = selectedAction;

  self.setState((prevState) => ({
    data: {
      ...prevState.data,
      actionCode,
      method,
      path,
    },
  }));
}

export function onSelectFeature(self, event) {
  const { rowId } = event.currentTarget.dataset;
  const { name, value } = event.target;
  const { serviceId } = self.state.pageLoad;
  const { serviceId: selectedServiceId } = self.state.data;

  const selectedService = serviceId.data.objectList.find(
    (s) => s.serviceId === selectedServiceId
  );

  const path = name.split(".");

  self.setState((prevState) => {
    const newData = _.cloneDeep(prevState.data);
    const fieldName = path.pop();
    const field = selectedService.fieldList.find((f) => f.fieldName === value);
    const pathToTheArray = path;
    const transformedArrayPath = pathToTheArray.flatMap((key) => [key, "data"]);
    const currentArray = _.get(newData, transformedArrayPath, []);
    const updatingObject = { [fieldName]: value };
    if (field) updatingObject.type = field.fieldType;
    const newArray = currentArray.map((item) => {
      if (String(item.id) === rowId) {
        return { ...item, ...updatingObject };
      }
      return item;
    });

    _.set(newData, transformedArrayPath, newArray);
    return { data: newData };
  });
}

export function handleIsUserFeatureToggle(self, event) {
  const { name } = event.target;
  const { rowId } = event.currentTarget.dataset;

  self.setState((prevState) => {
    const newData = _.cloneDeep(prevState);

    const pathToArray = ["data", name, "data"];
    const currentArray = _.get(newData, pathToArray, []);
    const newArray = currentArray.map((item) => {
      if (String(item.id) === rowId) {
        return {
          ...item,
          isUserFeature: !item.isUserFeature,
        };
      }
      return item;
    });

    _.set(newData, pathToArray, newArray);

    return newData;
  });
}

export async function onSelectUserField(self, event) {
  const { rowId } = event.currentTarget.dataset;
  const { value } = event.target;
  const { data } = self.state;

  const pathToArray = ["userFeatureList", "data"];
  const [fieldName, { apiEndpoint, query }] = Object.entries(QUERY_MODEL).find(
    ([key, data]) => key === value
  );

  const { select } = query;

  //lam mot cai model, gui den backend\
  const normalizedUri = normalizeUriForRequest(apiEndpoint, query);

  const response = await sendRequest(HTTP_METHOD.GET, normalizedUri);
  const { objectList } = response.data;

  // const ids = objectList.map(elem => elem._id);
  const options = objectList.map((elem) => {
    const labelArr = select.map((label) => elem[label]);
    return { value: elem._id, label: labelArr.join(" - ") };
  });

  const newData = _.cloneDeep(data);

  const currentArray = _.get(newData, pathToArray, []);
  const newArray = currentArray.map((elem) => {
    if (String(elem.id) === rowId) {
      return { ...elem, featureName: value, featureOptions: options };
    }
    return elem;
  });

  _.set(newData, pathToArray, newArray);

  self.setState({ data: newData });
}

export const onMultiFieldSelect = (self, selectedOptions, rowId) => {
  const { data } = self.state;

  const pathToArray = ["userFeatureList", "data"];

  const newData = _.cloneDeep(data);

  const featureValue = selectedOptions.map(o => o.value);

  const currentArray = _.get(newData, pathToArray, []);
  const newArray = currentArray.map((elem) => {
    if (String(elem.id) === rowId) {
      return { ...elem, featureValue,  };
    }
    return elem;
  });

  _.set(newData, pathToArray, newArray);

  self.setState({ data: newData }, () => {console.log(self.state.data)});
};
