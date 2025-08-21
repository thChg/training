import { DATA_TYPE } from "../../../constants/dataType";

export const model = {
  functionName: "Module",
  apiEndpoint: "/system/module",

  data: {
    _id: { type: DATA_TYPE.ID },
    moduleCode: { type: DATA_TYPE.STRING, clickable: true, required: true, canQuery: true },
    moduleName: { type: DATA_TYPE.STRING, required: true, canQuery: true },
    moduleOrder: { type: DATA_TYPE.NUMBER },
    createdAt: { type: DATA_TYPE.TIME },
    updatedAt: { type: DATA_TYPE.TIME },
  },

  query: {
    value: ["moduleCode", "moduleName", "moduleOrder", "createdAt", "updatedAt"],
    sortBy: "moduleName.asc",
  },
};
