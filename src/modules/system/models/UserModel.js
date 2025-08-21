import { DATA_TYPE } from "../../../constants/dataType";

export const model = {
  functionName: "User",
  apiEndpoint: "/system/user",

  data: {
    _id: { type: DATA_TYPE.ID },

    username: {
      type: DATA_TYPE.STRING,
      required: true,
      unique: true,
      clickable: true,
      canQuery: true,
    },
    password: { type: DATA_TYPE.PASSWORD },
    verifyPassword: { type: DATA_TYPE.PASSWORD },
    fullname: { type: DATA_TYPE.STRING, canQuery: true },
    email: { type: DATA_TYPE.STRING, unique: true, canQuery: true },
    phone: { type: DATA_TYPE.STRING },
    roleList: {
      type: DATA_TYPE.ARRAY,
      data: {
        roleId: {
          type: DATA_TYPE.ID,
          apiEndpoint: "/system/role",
          query: {
            value: ["roleCode", "roleName", "functionList"],
            sortBy: "roleCode.asc",
          },
          keyField: "roleId",
          relatedFields: ["roleCode", "roleName", "functionList"],
        },
        roleCode: { type: DATA_TYPE.STRING },
        roleName: { type: DATA_TYPE.STRING },
        functionList: {
          functionId: { type: DATA_TYPE.ID },
          functionName: { type: DATA_TYPE.STRING },
          functionUrl: { type: DATA_TYPE.STRING },
          functionOrder: { type: DATA_TYPE.NUMBER },

          parentId: { type: DATA_TYPE.ID },
          parentName: { type: DATA_TYPE.STRING },
          parentUrl: { type: DATA_TYPE.STRING },
          parentOrder: { type: DATA_TYPE.NUMBER },

          moduleId: { type: DATA_TYPE.ID },
          moduleName: { type: DATA_TYPE.STRING },
          moduleCode: { type: DATA_TYPE.STRING },
          moduleOrder: { type: DATA_TYPE.NUMBER },
        },
      },
    },
    functionList: [
      {
        functionId: { type: DATA_TYPE.ID },
        functionName: { type: DATA_TYPE.STRING },
        functionUrl: { type: DATA_TYPE.STRING },
        functionOrder: { type: DATA_TYPE.NUMBER },

        parentId: { type: DATA_TYPE.ID },
        parentName: { type: DATA_TYPE.STRING },
        parentUrl: { type: DATA_TYPE.STRING },
        parentOrder: { type: DATA_TYPE.NUMBER },

        moduleId: { type: DATA_TYPE.ID },
        moduleName: { type: DATA_TYPE.STRING },
        moduleCode: { type: DATA_TYPE.STRING },
        moduleOrder: { type: DATA_TYPE.NUMBER },
      },
    ],
    moduleList: [
      {
        moduleId: { type: DATA_TYPE.ID },
        moduleName: { type: DATA_TYPE.STRING },
        moduleCode: { type: DATA_TYPE.STRING },
        moduleOrder: { type: DATA_TYPE.NUMBER },
      },
    ],
    departmentList: [
      {
        departmentId: { type: DATA_TYPE.ID },
        departmentCode: { type: DATA_TYPE.STRING },
        departmentName: { type: DATA_TYPE.STRING },

        companyId: { type: DATA_TYPE.ID },
        companyCode: { type: DATA_TYPE.STRING },
        companyName: { type: DATA_TYPE.STRING },

        positionId: { type: DATA_TYPE.ID },
        positionCode: { type: DATA_TYPE.STRING },
        positionName: { type: DATA_TYPE.STRING },
      },
    ],
    departmentManagerId: { type: DATA_TYPE.ID },
    companyList: [
      {
        companyId: { type: DATA_TYPE.ID },
        companyCode: { type: DATA_TYPE.STRING },
        companyName: { type: DATA_TYPE.STRING },
      },
    ],
    companyCEOId: { type: DATA_TYPE.ID },
  },

  query: {
    value: ["username", "fullname", "email", "phone"],
    sortBy: "username.asc",
  },
};
