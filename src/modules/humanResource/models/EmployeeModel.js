import { DATA_TYPE } from "../../../constants/dataType";

export const model = {
  functionName: "Employee",
  apiEndpoint: "/human-resource/employee",
  data: {
    _id: { type: DATA_TYPE.ID },

    employeeCode: {
      type: DATA_TYPE.STRING,
      required: true,
      unique: true,
      clickable: true,
    },
    employeeName: { type: DATA_TYPE.STRING, required: true, unique: true },
    employeePhone: { type: DATA_TYPE.STRING },
    employeeDateOfBirth: { type: DATA_TYPE.STRING },

    userId: {
      type: DATA_TYPE.ID,
      apiEndpoint: "/system/user",
      relatedFields: ["username", "fullname", "email"],
      query: {
        value: ["username", "fullname", "email"],
        sortBy: "username.asc",
      },
      keyField: "userId",
    },
    username: { type: DATA_TYPE.STRING },
    fullname: { type: DATA_TYPE.STRING },
    email: { type: DATA_TYPE.STRING },

    companyId: {
      type: DATA_TYPE.ID,
      apiEndpoint: "/human-resource/company",
      keyField: "companyId",
      relatedFields: [
        "companyCode",
        "companyName",
        "companyCEOUsername",
        "companyCEOFullname",
      ],
      query: {
        value: [
          "companyCode",
          "companyName",
          "companyCEOUsername",
          "companyCEOFullname",
        ],
        sortBy: "companyCode.asc",
      },
    },
    companyCode: { type: DATA_TYPE.STRING },
    companyName: { type: DATA_TYPE.STRING },
    companyCEOUsername: { type: DATA_TYPE.STRING },
    companyCEOFullname: { type: DATA_TYPE.STRING },

    departmentId: {
      type: DATA_TYPE.ID,
      apiEndpoint: "/human-resource/department",
      keyField: "departmentId",
      relatedFields: [
        "departmentCode",
        "departmentName",
        "managerUsername",
        "managerFullname",
      ],
      query: {
        value: [
          "departmentCode",
          "departmentName",
          "companyId",
          "managerUsername",
          "managerFullname",
        ],
        sortBy: "departmentCode.asc",
      },
    },
    departmentCode: { type: DATA_TYPE.STRING },
    departmentName: { type: DATA_TYPE.STRING },
    managerUsername: { type: DATA_TYPE.STRING },
    managerFullname: { type: DATA_TYPE.STRING },

    positionId: {
      type: DATA_TYPE.ID,
      apiEndpoint: "/human-resource/position",
      keyField: "positionId",
      relatedFields: ["positionCode", "positionName"],
      query: {
        value: ["positionCode", "positionName"],
        sortBy: "positionCode.asc",
      },
    },
    positionCode: { type: DATA_TYPE.STRING },
    positionName: { type: DATA_TYPE.STRING },

    titleId: {
      type: DATA_TYPE.ID,
      apiEndpoint: "/human-resource/title",
      keyField: "titleId",
      relatedFields: ["titleCode", "titleName"],
      query: {
        value: ["titleCode", "titleName"],
        sortBy: "titleCode.asc",
      },
    },
    titleCode: { type: DATA_TYPE.STRING },
    titleName: { type: DATA_TYPE.STRING },

    grossSalary: { type: DATA_TYPE.CURRENCY },
    travelAllowance: { type: DATA_TYPE.CURRENCY },
    mealAllowance: { type: DATA_TYPE.CURRENCY },
    kpiSalary: { type: DATA_TYPE.CURRENCY },
  },

  query: {
    value: ["employeeCode", "employeeName", "employeePhone", "departmentName"],
  },
};
