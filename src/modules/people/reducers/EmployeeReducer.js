import {
  CREATE_EMPLOYEE_FAILURE,
  DELETE_MANY_EMPLOYEE_FAILURE,
  FETCH_EMPLOYEE_DATA_FAILURE,
  FETCH_EMPLOYEE_LIST_FAILURE,
  FETCH_EMPLOYEE_LIST_START,
  FETCH_EMPLOYEE_LIST_SUCCESS,
  IMPORT_EMPLOYEE_FROM_FILE_FAILURE,
  PRINT_RECORDS_FAILURE,
} from "../actions/EmployeeAction";

const initialState = {
  loading: false,
  error: null,
  employeeList: [],
  recordLength: 0,
};

const EmployeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EMPLOYEE_LIST_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_EMPLOYEE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        employeeList: action.payload.employees,
        recordLength: action.payload.totalEmployees,
      };
    case FETCH_EMPLOYEE_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_MANY_EMPLOYEE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case PRINT_RECORDS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_EMPLOYEE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case IMPORT_EMPLOYEE_FROM_FILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_EMPLOYEE_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default EmployeeReducer;
