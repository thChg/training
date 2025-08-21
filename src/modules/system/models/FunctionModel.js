import { DATA_TYPE } from "../../../constants/dataType";

export const model = {
  functionName: "Function",
  apiEndpoint: "/system/function",

  data: {
    _id: { type: DATA_TYPE.ID },

    functionName: { type: DATA_TYPE.STRING, required: true, clickable: true, canQuery: true },
    functionUrl: { type: DATA_TYPE.STRING, required: true, canQuery: true },
    functionOrder: { type: DATA_TYPE.NUMBER },
    functionActionList: {type: DATA_TYPE.STRING},

    parentId: {
      type: DATA_TYPE.ID,
      apiEndpoint: "/system/function",
      relatedFields: [
        { fromField: "parentName", toField: "functionName" },
        { fromField: "parentUrl", toField: "functionUrl" },
        { fromField: "parentOrder", toField: "functionOrder" },
      ],
      query: {
        value: ["functionName", "functionUrl", "functionOrder"],
        sortBy: "functionName.asc",
      },
      keyField: "parentId",
    },
    parentName: { type: DATA_TYPE.STRING },
    parentUrl: { type: DATA_TYPE.STRING },
    parentOrder: { type: DATA_TYPE.NUMBER },

    moduleId: {
      type: DATA_TYPE.ID,
      apiEndpoint: "/system/module",
      relatedFields: ["moduleName", "moduleCode", "moduleOrder"],
      query: { value: ["moduleName", "moduleCode", "moduleOrder"], sortBy: "moduleName.asc" },
      keyField: "moduleId",
    },
    moduleName: { type: DATA_TYPE.STRING },
    moduleCode: { type: DATA_TYPE.STRING },
    moduleOrder: { type: DATA_TYPE.NUMBER },

  },

  query: {
    value: ["functionName", "functionUrl", "parentName", "moduleName"],
    sortBy: "functionName.asc",
  },
};
