import { DATA_TYPE } from "../constants/dataType";

export const model = {
  stateName: "employee",
  data: {
    _id: { type: DATA_TYPE.ID, required: true },
    name: { type: DATA_TYPE.STRING, required: true, canQuery: true },
    department: { type: DATA_TYPE.STRING, required: true, canQuery: true },
    email: { type: DATA_TYPE.STRING, required: false, canQuery: true },
    isActive: { type: DATA_TYPE.BOOLEAN, required: true, canQuery: false },
    isRemote: { type: DATA_TYPE.BOOLEAN, required: true, canQuery: false },
    isManager: { type: DATA_TYPE.BOOLEAN, required: true, canQuery: false },
    hasOnboarded: { type: DATA_TYPE.BOOLEAN, required: true, canQuery: false },
    isFullTime: { type: DATA_TYPE.BOOLEAN, required: true, canQuery: false },
  },
};
