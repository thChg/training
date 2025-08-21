import { DATA_TYPE } from "../../../constants/dataType";

export const model = {
  functionName: "Company",
  apiEndpoint: "/human-resource/company",

  data: {
    _id: { type: DATA_TYPE.ID },

    companyCode: {
      type: DATA_TYPE.STRING,
      required: true,
      clickable: true,
      unique: true,
    },
    companyName: {
      type: DATA_TYPE.STRING,
      required: true,
      unique: true,
    },
    companyTaxCode: { type: DATA_TYPE.STRING, required: true },
    companyPhone: { type: DATA_TYPE.STRING },
    companyAddress: { type: DATA_TYPE.STRING },
    companyEmail: { type: DATA_TYPE.STRING },

    companyCEOId: {
      type: DATA_TYPE.ID,
      apiEndpoint: "/system/user",
      keyField: "companyCEOId",
      relatedFields: [
        { fromField: "companyCEOUsername", toField: "username" },
        { fromField: "companyCEOFullname", toField: "fullname" },
      ],
      query: {
        value: ["username", "fullname"],
        sortBy: "username.asc",
      },
    },
    companyCEOUsername: { type: DATA_TYPE.STRING },
    companyCEOFullname: { type: DATA_TYPE.STRING },

    departmentList: {
      type: DATA_TYPE.ARRAY,
      data: {
        departmentId: { type: DATA_TYPE.ID },
        departmentCode: { type: DATA_TYPE.STRING },
        departmentName: { type: DATA_TYPE.STRING },

        managerId: { type: DATA_TYPE.ID },
        managerUsername: { type: DATA_TYPE.STRING },
        managerFullname: { type: DATA_TYPE.STRING },
      },
    },

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
            "titleCode",
            "titleName",
          ],
          query: {
            value: ["positionCode", "positionName", "titleCode", "titleName"],
            sortBy: "positionCode.asc",
          },
        },
        positionCode: { type: DATA_TYPE.STRING },
        positionName: { type: DATA_TYPE.STRING },
        titleCode: { type: DATA_TYPE.STRING },
        titleName: { type: DATA_TYPE.STRING },

        departmentId: {
          type: DATA_TYPE.ID,
          apiEndpoint: "/human-resource/department",
          keyField: "departmentId",
          relatedFields: ["departmentCode", "departmentName"],
          query: {
            value: ["departmentCode", "departmentName"],
            sortBy: "departmentCode.asc",
          },
        },
        departmentCode: { type: DATA_TYPE.STRING },
        departmentName: { type: DATA_TYPE.STRING },
      },
    },
  },

  query: {
    value: [
      "companyCode",
      "companyName",
      "companyTaxCode",
      "companyPhone",
      "companyAddress",
      "companyEmail",
    ],
    sortBy: "companyCode.asc",
  },
};
