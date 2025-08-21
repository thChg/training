import _, { split } from "lodash";
import {
  isObjectId,
  normalizeDataToObject,
  createTemplateFromObjectModel,
  normalizeUriForRequest,
  sendRequest,
} from "./CommonHelper";
import moment from "moment";
import { DATA_TYPE } from "../../constants/dataType";
import { HTTP_METHOD } from "../../constants/httpMethod";

function extractPageLoad(object, prefix = "") {
  let pageLoad = {};

  Object.entries(object).forEach(([key, value]) => {
    const field = prefix ? `${prefix}.${key}` : key;
    if (value.type === DATA_TYPE.ID && value.apiEndpoint) {
      pageLoad[field] = { ...value, data: [] };
    } else if (value.type === DATA_TYPE.ARRAY) {
      pageLoad = { ...pageLoad, ...extractPageLoad(value.data, field) };
    }
  });

  return pageLoad;
}

export function initFormComponent(self, props) {
  const { functionName, apiEndpoint, params, data, user } = props;

  const objectClone = { ...data.object };
  let pageLoad = extractPageLoad(objectClone);
  const formData = Object.entries(objectClone).reduce((acc, [key, value]) => {
    if (value.type === DATA_TYPE.ARRAY) {
      acc[key] = {
        ...value,
        filter: value.filter
          ? value.filter.reduce((a, filter) => {
              a[filter] = "";
              return a;
            }, {})
          : {},
      };
    } else {
      acc[key] = value;
    }
    return acc;
  }, {});

  self.state = {
    functionName,
    apiEndpoint,
    id: params.id,
    isEditing: false,
    data: formData,
    pageLoad,
    user,
  };

  self.onRemoveLine = onRemoveLine.bind(self, self);
  self.onClearFilter = onClearFilter.bind(self, self);
  self.onSave = onSave.bind(self, self);
  self.onCreate = onCreate.bind(self, self);
  self.onTextFieldChange = onTextFieldChange.bind(self, self);
  self.onSelectFieldChange = onSelectFieldChange.bind(self, self);
  self.editToggle = editToggle.bind(self, self);
  self.onAddObject = onAddObject.bind(self, self);
}

export async function loadFormComponentData(self) {
  const { apiEndpoint, id, pageLoad, data } = self.state;
  const { object } = self.props.data;
  const objectClone = { ...object };
  const isNew = !isObjectId(id);
  const mainTask = isNew
    ? async () => {
        const dataTemplate = createTemplateFromObjectModel(data);

        self.setState({ data: dataTemplate, isEditing: true });
      }
    : async () => {
        try {
          const normalizedUri = normalizeUriForRequest(apiEndpoint, null, id);

          const response = await sendRequest(HTTP_METHOD.GET, normalizedUri);

          const normalizedData = normalizeDataToObject(
            response.data,
            objectClone
          );
          self.setState({ data: normalizedData });
        } catch (error) {
          console.error(error);
        }
      };

  // Load all pageLoad data
  const subTasks = Object.entries(pageLoad).map(
    ([key, { apiEndpoint, query, keyField }]) =>
      async () => {
        try {
          const { value: select, sortBy } = query;

          const normalizedUri = normalizeUriForRequest(
            apiEndpoint,
            { select, sortBy },
            null
          );

          const response = await sendRequest(HTTP_METHOD.GET, normalizedUri);

          const normalizedObjectList = response.data.objectList.map((o) => ({
            ...o,
            [keyField]: o._id,
          }));

          self.setState((prevState) => ({
            pageLoad: {
              ...prevState.pageLoad,
              [key]: {
                ...prevState.pageLoad[key],
                data: {
                  ...response.data,
                  objectList: normalizedObjectList,
                },
              },
            },
          }));
        } catch (error) {
          console.error(error);
        }
      }
  );

  // Run all tasks in parallel
  await Promise.all([mainTask(), ...subTasks.map((task) => task())]);
}

function onRemoveLine(self, name, id) {
  const camelCaseName = _.camelCase(name);

  const filteredData = self.state.data[camelCaseName].data.filter(
    (ob) => ob.id !== id
  );
  self.setState((prevState) => ({
    data: {
      ...prevState.data,
      [camelCaseName]: {
        ...prevState.data[camelCaseName],
        data: filteredData,
      },
    },
  }));
}

function onClearFilter(self) {
  const { data } = self.state;

  const clearedData = Object.entries(data).reduce((acc, [key, value]) => {
    if (value && value.type === DATA_TYPE.ARRAY && value.filter) {
      acc[key] = {
        ...value,
        filter: Object.keys(value.filter).reduce((filterAcc, filterKey) => {
          filterAcc[filterKey] = "";
          return filterAcc;
        }, {}),
      };
    } else {
      acc[key] = value;
    }
    return acc;
  }, {});

  self.setState({ data: clearedData });
}

async function onSave(self) {
  const { state, props } = self;
  const { object } = props.data;
  const { apiEndpoint } = props;
  const { data, id } = state;

  const objectClone = { ...object };

  const validated = validateDataToModel(objectClone, data);
  if (!validated) {
    alert("Required field(s) can not be left empty.");
    return;
  }

  const reqBody = Object.entries(objectClone).reduce((acc, [key, value]) => {
    if (value.type === DATA_TYPE.ARRAY) {
      const arrayData = data[key].data.map((o) =>
        Object.entries(value.data).reduce((subAcc, [subKey, subValue]) => {
          subAcc[subKey] = o[subKey];
          return subAcc;
        }, {})
      );

      acc[key] = arrayData;
    } else if (key === "updatedAt") {
      acc[key] = moment().format("YYYY-MM-DD HH:mm");
    } else {
      acc[key] = data[key];
    }

    return acc;
  }, {});

  const normalizedUri = normalizeUriForRequest(apiEndpoint, null, id);

  await sendRequest(HTTP_METHOD.PUT, normalizedUri, reqBody);

  self.editToggle();
}

async function onCreate(self) {
  const { state, props } = self;
  const { data, apiEndpoint } = state;
  const { object } = props.data;
  const objectClone = { ...object };
  //validate
  const validated = validateDataToModel(objectClone, data);
  if (!validated) {
    alert("Required field(s) can not be left empty.");
    return;
  }

  //gather data
  const reqBody = Object.entries(objectClone).reduce((acc, [key, value]) => {
    if (value.type === DATA_TYPE.ARRAY) {
      acc[key] = data[key].data;
    } else {
      acc[key] = data[key];
    }
    return acc;
  }, {});

  //send to backend
  await sendRequest(HTTP_METHOD.POST, apiEndpoint, reqBody);

  //navigate to list
  const path = window.location.pathname;
  const listPath = path.split("/").slice(0, -1).join("/");

  props.navigate(listPath);
}

function onTextFieldChange(self, event) {
  const { value, name } = event.target;
  const { rowId } = event.currentTarget.dataset;
  const path = name.split(".");

  self.setState((prevState) => {
    const newData = _.cloneDeep(prevState.data);

    if (rowId) {
      const fieldNameInObject = path.pop();
      const pathToTheArray = path;
      const transformedArrayPath = pathToTheArray.flatMap((key) => [
        key,
        "data",
      ]);
      const currentArray = _.get(newData, transformedArrayPath, []);

      const newArray = currentArray.map((item) => {
        if (String(item.id) === rowId) {
          return { ...item, [fieldNameInObject]: value };
        }
        return item;
      });

      _.set(newData, transformedArrayPath, newArray);
      return { data: newData };
    } else {
      const transformedPath = path
        .slice(0, -1)
        .flatMap((key) => [key, "data"])
        .concat(path.slice(-1));

      _.set(newData, transformedPath, value);
      return { data: newData };
    }
  });
}

function onSelectFieldChange(self, event) {
  const { name, value } = event.target;
  const { rowId } = event.currentTarget.dataset;
  const { pageLoad, data: originalData } = self.state;

  const splittedName = name.split(".");
  const config = pageLoad[name];

  if (!config) return;

  // 1. Find the selected data object
  const selectedObj = config.data.objectList.find((o) => o._id === value);

  if (!selectedObj) return;

  let updates = {};

  if (splittedName.length > 1) {
    const currentObj = self.state.data[splittedName[0]].data.find(
      (ob) => ob.id === rowId
    );
    const lastField = splittedName[splittedName.length - 1];
    updates = currentObj;

    updates[lastField] = selectedObj._id;
  }

  updates[name] = value;
  // 2. Handle related fields
  if (config.relatedFields) {
    config.relatedFields.forEach((f) => {
      if (_.isPlainObject(f)) {
        updates[f.fromField] = selectedObj[f.toField];
      } else {
        updates[f] = selectedObj[f];
      }
    });
  }

  //got the updates means the need to add to array in state. mow update and set the array to newDat
  let newData = _.cloneDeep(originalData);

  if (splittedName.length > 1) {
    const arrayName = splittedName[0];

    const array = newData[arrayName].data.map((e) =>
      e.id === rowId ? updates : e
    );

    newData[arrayName].data = array;
  } else {
    newData = { ...newData, ...updates };
  }

  self.setState({
    data: newData,
  });
}

function editToggle(self) {
  self.setState((prevState) => ({
    isEditing: !prevState.isEditing,
  }));
}

function validateDataToModel(model, data) {
  for (const [key, value] of Object.entries(model)) {
    if (value.required && (!data[key] || data[key].length === 0)) {
      return false;
    }
  }

  return true;
}

function onAddObject(self, name) {
  const { state, props } = self;
  const { isEditing } = state;
  const { object } = props.data;
  const objectClone = { ...object };
  const arrayModel = objectClone[name].data;

  const newObject = Object.keys(arrayModel).reduce((acc, key) => {
    acc[key] = null;
    return acc;
  }, {});

  newObject.id = _.uniqueId();

  if (!isEditing) return;

  const { data: array } = self.state.data[name];
  const newObjectList = [...array, newObject];

  self.setState((prevState) => ({
    data: {
      ...prevState.data,
      [name]: {
        ...prevState.data[name],
        data: newObjectList,
      },
    },
  }));
}
