import {
  CREATE_SALE_ORDER_FAILURE,
  DELETE_MANY_SALE_ORDER_FAILURE,
  FETCH_SALE_ORDER_DATA_FAILURE,
  FETCH_SALE_ORDER_LIST_FAILURE,
  FETCH_SALE_ORDER_LIST_START,
  FETCH_SALE_ORDER_LIST_SUCCESS,
  IMPORT_SALE_ORDER_FROM_FILE_FAILURE,
  PRINT_RECORDS_FAILURE,
} from "../actions/SaleOrderAction";

const initialState = {
  loading: false,
  error: null,
  saleOrderList: [],
  recordLength: 0,
};

const SaleOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SALE_ORDER_LIST_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_SALE_ORDER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        saleOrderList: action.payload.saleOrders,
        recordLength: action.payload.totalSaleOrders,
      };
    case FETCH_SALE_ORDER_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_MANY_SALE_ORDER_FAILURE:
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
    case CREATE_SALE_ORDER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case IMPORT_SALE_ORDER_FROM_FILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_SALE_ORDER_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default SaleOrderReducer;
