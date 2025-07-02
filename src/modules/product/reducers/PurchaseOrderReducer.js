import {
  CREATE_PURCHASE_ORDER_FAILURE,
  DELETE_MANY_PURCHASE_ORDER_FAILURE,
  FETCH_PURCHASE_ORDER_DATA_FAILURE,
  FETCH_PURCHASE_ORDER_LIST_FAILURE,
  FETCH_PURCHASE_ORDER_LIST_START,
  FETCH_PURCHASE_ORDER_LIST_SUCCESS,
  IMPORT_PURCHASE_ORDER_FROM_FILE_FAILURE,
  PRINT_RECORDS_FAILURE,
} from "../actions/PurchaseOrderAction";

const initialState = {
  loading: false,
  error: null,
  purchaseOrderList: [],
  recordLength: 0,
};

const PurchaseOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PURCHASE_ORDER_LIST_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PURCHASE_ORDER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        purchaseOrderList: action.payload.purchaseOrders,
        recordLength: action.payload.totalPurchaseOrders,
      };
    case FETCH_PURCHASE_ORDER_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_MANY_PURCHASE_ORDER_FAILURE:
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
    case CREATE_PURCHASE_ORDER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case IMPORT_PURCHASE_ORDER_FROM_FILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_PURCHASE_ORDER_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default PurchaseOrderReducer;
