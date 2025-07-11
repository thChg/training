import {
  CREATE_CUSTOMER_FAILURE,
  DELETE_MANY_CUSTOMER_FAILURE,
  FETCH_CUSTOMER_LIST_FAILURE,
  FETCH_CUSTOMER_LIST_START,
  FETCH_CUSTOMER_LIST_SUCCESS,
  PRINT_RECORDS_FAILURE,
} from "../actions/CustomerAction";

const initialState = {
  loading: false,
  error: null,
  customerList: [],
  recordLength: 0,
};

const CustomerReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CUSTOMER_LIST_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_CUSTOMER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        customerList: action.payload.customers,
        recordLength: action.payload.totalCustomers,
      };
    case FETCH_CUSTOMER_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_MANY_CUSTOMER_FAILURE:
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
    case CREATE_CUSTOMER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default CustomerReducer;