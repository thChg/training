import { DATA_TYPE } from "../../../constants/dataType";

export const model = {
  functionName: "Position",
  apiEndpoint: "/human-resource/position",

  data: {
    _id: { type: DATA_TYPE.ID },

    positionCode: {
      type: DATA_TYPE.STRING,
      required: true,
      canQuery: true,
      clickable: true,
    },
    positionName: { type: DATA_TYPE.STRING, required: true, canQuery: true },

    titleId: {
      type: DATA_TYPE.ID,
      apiEndpoint: "human-resource/title",
      query: { value: ["titleCode", "titleName"], sortBy: "titleCode.asc" },
      keyField: "titleId",
      relatedFields: ["titleCode", "titleName"],
    },
    titleCode: { type: DATA_TYPE.STRING },
    titleName: { type: DATA_TYPE.STRING },

    createdAt: { type: DATA_TYPE.TIME },
    updatedAt: { type: DATA_TYPE.TIME },
  },

  query: {
    value: [
      "positionCode",
      "positionName",
      "titleName",
      "createdAt",
      "updatedAt",
    ],
    sortBy: "positionCode.asc",
  },
};
