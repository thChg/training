import {
  FETCH_ACCOUNTANT_LIST_START,
  FETCH_ACCOUNTANT_LIST_FAILURE,
  FETCH_ACCOUNTANT_LIST_SUCCESS,
  FETCH_ACCOUNTANT_DATA_FAILURE,
  CREATE_ACCOUNTANT_FAILURE,
  IMPORT_ACCOUNTANT_FROM_FILE_FAILURE,
  DELETE_MANY_ACCOUNTANT_FAILURE,
  PRINT_RECORDS_FAILURE,
} from "../actions/AccountantAction";

const initialState = {
  loading: false,
  error: null,
  accountantList: [],
  recordLength: 0,
};

const AccountantReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ACCOUNTANT_LIST_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ACCOUNTANT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        accountantList: action.payload.accountants,
        recordLength: action.payload.totalAccountants,
      };
    case FETCH_ACCOUNTANT_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_MANY_ACCOUNTANT_FAILURE:
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
    case CREATE_ACCOUNTANT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case IMPORT_ACCOUNTANT_FROM_FILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_ACCOUNTANT_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default AccountantReducer;
