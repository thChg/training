import { DATA_TYPE } from "../../../constants/dataType";

export const model = {
  functionName: "Access",
  apiEndpoint: "/system/access",

  data: {
    _id: { type: DATA_TYPE.ID },

    policyId: { type: DATA_TYPE.ID },
    policyName: { type: DATA_TYPE.STRING, canQuery: true, clickable: true },

    userId: { type: DATA_TYPE.ID },
    username: { type: DATA_TYPE.STRING, canQuery: true },
    fullname: { type: DATA_TYPE.STRING },

    functionId: { type: DATA_TYPE.ID },
    functionName: { type: DATA_TYPE.STRING },
    functionUrl: { type: DATA_TYPE.STRING, canQuery: true },

    serviceId: { type: DATA_TYPE.ID },
    serviceCode: { type: DATA_TYPE.STRING, required: true },
    serviceName: { type: DATA_TYPE.STRING, required: true },

    actionCode: { type: DATA_TYPE.STRING },
    method: { type: DATA_TYPE.STRING, required: true },
    path: { type: DATA_TYPE.STRING, required: true },

    recordFeatureList: {
      type: DATA_TYPE.ARRAY,
      data: {
        featureName: DATA_TYPE.STRING,
        type: DATA_TYPE.STRING,
        operator: DATA_TYPE.STRING,
        isUserFeature: DATA_TYPE.BOOLEAN,
        featureValue: {
          type: DATA_TYPE.ARRAY,
          data: { type: DATA_TYPE.STRING },
        },
      },
    },
    apiFeatureList: {
      type: DATA_TYPE.ARRAY,
      data: {
        featureName: DATA_TYPE.STRING,
        type: DATA_TYPE.STRING,
        operator: DATA_TYPE.STRING,
        isUserFeature: DATA_TYPE.BOOLEAN,
        featureValue: {
          type: DATA_TYPE.ARRAY,
          data: { type: DATA_TYPE.STRING },
        },
      },
    },
    userFeatureList: {
      type: DATA_TYPE.ARRAY,
      data: {
        featureName: DATA_TYPE.STRING,
        type: DATA_TYPE.STRING,
        operator: DATA_TYPE.STRING,
        featureValue: {
          type: DATA_TYPE.ARRAY,
          data: { type: DATA_TYPE.STRING },
        },
      },
    },
  },

  query: {
    value: [
      "policyName",
      "username",
      "functionUrl",
      "actionCode",
      "method",
      "path",
    ],
    sortBy: "policyName.asc",
  },
};
