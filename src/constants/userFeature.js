export const USER_FIELD = {
  ROLE_LIST: "roleList",
  FUNCTION_LIST: "functionList",
  MODULE_LIST: "moduleList",
  DEPARTMENT_LIST: "departmentList",
  DEPARTMENT_MANAGER_ID: "departmentManagerId",
  COMPANY_LIST: "companyList",
  COMPANY_CEO_ID: "companyCEOId",
};

export const QUERY_MODEL = {
  roleList: {
    apiEndpoint: "/system/role",

    query: {
      select: ["roleCode", "roleName"],
      sortBy: "roleCode.asc",
    },
  },

  functionList: {
    apiEndpoint: "/system/function",
    query: {
      select: ["functionName", "functionUrl"],
      sortBy: "functionName.asc",
    },
  },

  moduleList: {
    apiEndpoint: "/system/module",
    query: {
      select: ["moduleCode", "moduleName"],
      sortBy: "moduleCode.asc",
    },
  },

  departmentList: {
    apiEndpoint: "/human-resource/department",
    query: {
      select: ["departmentCode", "departmentName"],
      sortBy: "departmentCode.asc",
    },
  },

  departmentManagerId: {
    apiEndpoint: "/human-resource/department",
    query: {
      select: ["managerUsername", "managerFullname"],
      sortBy: "managerUsername.asc",
    },
  },

  companyList: {
    apiEndpoint: "/human-resource/company",
    query: {
      select: ["companyCode", "companyName"],
      sortBy: "companyCode.asc",
    },
  },

  companyCEOId: {
    apiEndpoint: "/human-resource/company",
    query: {
      select: ["companyCEOUsername", "companyCEOFullname"],
      sortBy: "companyCEOUsername.asc",
    },
  },
};

export const USER_FIELD_OPTIONS = [
  { label: USER_FIELD.ROLE_LIST, value: USER_FIELD.ROLE_LIST },
  { label: USER_FIELD.FUNCTION_LIST, value: USER_FIELD.FUNCTION_LIST },
  { label: USER_FIELD.MODULE_LIST, value: USER_FIELD.MODULE_LIST },
  { label: USER_FIELD.DEPARTMENT_LIST, value: USER_FIELD.DEPARTMENT_LIST },
  {
    label: USER_FIELD.DEPARTMENT_MANAGER_ID,
    value: USER_FIELD.DEPARTMENT_MANAGER_ID,
  },
  { label: USER_FIELD.COMPANY_LIST, value: USER_FIELD.COMPANY_LIST },
  { label: USER_FIELD.COMPANY_CEO_ID, value: USER_FIELD.COMPANY_CEO_ID },
];
