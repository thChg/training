import { DATA_TYPE } from "../../../constants/dataType";

export const model = {
  functionName: "Policy",
  apiEndpoint: "/system/policy",

  data: {
    _id: { type: DATA_TYPE.ID },
    policyName: {
      type: DATA_TYPE.STRING,
      required: true,
      unique: true,
      clickable: true,
    },

    serviceId: {
      type: DATA_TYPE.ID,
      apiEndpoint: "/system/resource",
      keyField: "serviceId",
      relatedFields: ["serviceCode", "serviceName"],
      query: {
        value: ["serviceCode", "serviceName", "actionList", "fieldList"],
        sortBy: "serviceCode.asc",
      },
      required: true,
    },
    serviceCode: { type: DATA_TYPE.STRING, required: true },
    serviceName: { type: DATA_TYPE.STRING, required: true },

    actionCode: {
      type: DATA_TYPE.STRING,
      required: true,
    },
    method: { type: DATA_TYPE.STRING, required: true },
    path: { type: DATA_TYPE.STRING, required: true },

    functionId: {
      type: DATA_TYPE.ID,
      apiEndpoint: "/system/function",
      keyField: "functionId",
      relatedFields: [, "functionName", "functionUrl"],
      query: {
        value: ["functionName", "functionUrl"],
        sortBy: "functionCode.asc",
      },
      required: true,
    },
    functionName: { type: DATA_TYPE.STRING, required: true },
    functionUrl: { type: DATA_TYPE.STRING, required: true },

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
        operator: DATA_TYPE.STRING,
        featureValue: {
          type: DATA_TYPE.ARRAY,
          data: { type: DATA_TYPE.STRING },
        },
      },
    },
  },

  query: {
    value: ["policyCode", "policyName"],
    orderBy: "policyCode.asc",
  },
};
