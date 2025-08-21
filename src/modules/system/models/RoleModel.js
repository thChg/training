import { DATA_TYPE } from "../../../constants/dataType";

export const model = {
  functionName: "Role",
  apiEndpoint: "/system/role",

  data: {
    _id: { type: DATA_TYPE.ID },
    roleCode: {
      type: DATA_TYPE.STRING,
      required: true,
      clickable: true,
      canQuery: true,
    },
    roleName: { type: DATA_TYPE.STRING, required: true, canQuery: true },
    functionList: {
      type: DATA_TYPE.ARRAY,
      data: {
        functionId: {
          type: DATA_TYPE.ID,
          apiEndpoint: "/system/function",
          query: {
            value: [
              "functionName",
              "functionUrl",
              "functionName",
              "functionOrder",
              "parentId",
              "parentUrl",
              "parentName",
              "parentOrder",
              "moduleId",
              "moduleCode",
              "moduleName",
              "moduleOrder",
            ],
            sortBy: "functionName.asc",
          },
          keyField: "functionId",
        },
        functionUrl: { type: DATA_TYPE.STRING },
        functionName: { type: DATA_TYPE.STRING },
        functionOrder: { type: DATA_TYPE.NUMBER },

        parentId: { type: DATA_TYPE.ID },
        parentUrl: { type: DATA_TYPE.STRING },
        parentName: { type: DATA_TYPE.STRING },
        parentOrder: { type: DATA_TYPE.STRING },

        moduleId: { type: DATA_TYPE.ID },
        moduleCode: { type: DATA_TYPE.STRING },
        moduleName: { type: DATA_TYPE.STRING },
        moduleOrder: { type: DATA_TYPE.NUMBER },
      },
      filter: ["functionName", "moduleName"],
    },
    createdAt: { type: DATA_TYPE.TIME },
    updatedAt: { type: DATA_TYPE.TIME },
  },

  query: {
    value: ["roleCode", "roleName", "createdAt", "updatedAt"],
    sortBy: "roleName.asc",
  },
};
