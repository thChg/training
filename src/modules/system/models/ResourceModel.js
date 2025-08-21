import { DATA_TYPE } from "../../../constants/dataType";

export const model = {
  functionName: "Resource",
  apiEndpoint: "/system/resource",

  data: {
    _id: { type: DATA_TYPE.ID },
    serviceCode: {
      type: DATA_TYPE.STRING,
      required: true,
      unique: true,
      clickable: true,
    },
    serviceName: { type: DATA_TYPE.STRING, required: true, unique: true },

    actionList: {
      type: DATA_TYPE.ARRAY,
      data: {
        actionCode: { type: DATA_TYPE.STRING },
        method: { type: DATA_TYPE.STRING },
        path: { type: DATA_TYPE.STRING },
      },
    },

    fieldList: {
      type: DATA_TYPE.ARRAY,
      data: {
        fieldName: { type: DATA_TYPE.STRING },
        fieldType: { type: DATA_TYPE.STRING },
        required: { type: DATA_TYPE.BOOLEAN },
      },
    },

    createdAt: { type: DATA_TYPE.TIME },
  },

  query: {
    value: ["serviceCode", "serviceName", "createdAt"],
    sortBy: "serviceCode.asc",
  },
};
