import { DATA_TYPE } from "../../../constants/dataType";

export const model = {
  functionName: "Title",
  apiEndpoint: "/human-resource/title",

  data: {
    _id: { type: DATA_TYPE.ID },

    titleCode: {
      type: DATA_TYPE.STRING,
      required: true,
      canQuery: true,
      unique: true,
      clickable: true,
    },
    titleName: {
      type: DATA_TYPE.STRING,
      required: true,
      canQuery: true,
      unique: true,
    },
  },
  query: {
    value: ["titleCode", "titleName"],
    sortBy: "titleCode.asc",
  },
};
