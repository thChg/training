import { DATA_TYPE } from "../../../constants/dataType";

export const model = {
  functionName: "Department",
  apiEndpoint: "/human-resource/department",

  data: {
    _id: { type: DATA_TYPE.ID },

    departmentCode: {
      type: DATA_TYPE.STRING,
      required: true,
      canQuery: true,
      clickable: true,
    },
    departmentName: { type: DATA_TYPE.STRING, required: true, canQuery: true },
    departmentAddress: { type: DATA_TYPE.STRING },

    managerId: {
      type: DATA_TYPE.ID,
      apiEndpoint: "/system/user",
      keyField: "managerId",
      relatedFields: [
        { fromField: "managerUsername", toField: "username" },
        { fromField: "managerFullname", toField: "fullname" },
      ],
      query: {
        value: ["username", "fullname"],
        sortBy: "username.asc",
      },
    },
    managerUsername: { type: DATA_TYPE.STRING },
    managerFullname: { type: DATA_TYPE.STRING },

    companyId: {
      type: DATA_TYPE.ID,
      apiEndpoint: "/human-resource/company",
      query: {
        value: [
          "companyCode",
          "companyName",
          "companyCEOId",
          "companyCEOUsername",
          "companyCEOFullname",
        ],
        sortBy: "companyCode.asc",
      },
      relatedFields: [
        "companyCode",
        "companyName",
        "companyCEOId",
        "companyCEOUsername",
        "companyCEOFullname",
      ],
      keyField: "companyId",
    },
    companyCode: { type: DATA_TYPE.STRING, required: true },
    companyName: { type: DATA_TYPE.STRING, required: true },

    companyCEOId: { type: DATA_TYPE.ID },
    companyCEOUsername: { type: DATA_TYPE.STRING },
    companyCEOFullname: { type: DATA_TYPE.STRING },

    staffList: {
      type: DATA_TYPE.ARRAY,
      data: {
        staffId: {
          type: DATA_TYPE.ID,
          apiEndpoint: "/system/user",
          keyField: "staffId",
          relatedFields: [
            { fromField: "staffUsername", toField: "username" },
            { fromField: "staffFullname", toField: "fullname" },
          ],
          query: {
            value: ["username", "fullname"],
            sortBy: "username.asc",
          },
        },
        staffUsername: { type: DATA_TYPE.STRING },
        staffFullname: { type: DATA_TYPE.STRING },

        positionId: {
          type: DATA_TYPE.ID,
          apiEndpoint: "/human-resource/position",
          keyField: "positionId",
          relatedFields: [
            "positionCode",
            "positionName",
            "titleName",
            "titleCode",
          ],
          query: {
            value: ["positionCode", "positionName", , "titleName", "titleCode"],
            sortBy: "positionCode.asc",
          },
        },
        positionCode: { type: DATA_TYPE.STRING },
        positionName: { type: DATA_TYPE.STRING },
        titleCode: { type: DATA_TYPE.STRING },
        titleName: { type: DATA_TYPE.STRING },
      },
    },
  },

  query: {
    value: ["departmentCode", "departmentName", "departmentAddress"],
    sortBy: "departmentCode.asc",
  },
};
