import {
  CREATE_PRODUCT_FAILURE,
  DELETE_MANY_PRODUCT_FAILURE,
  FETCH_PRODUCT_DATA_FAILURE,
  FETCH_PRODUCT_LIST_FAILURE,
  FETCH_PRODUCT_LIST_START,
  FETCH_PRODUCT_LIST_SUCCESS,
  IMPORT_PRODUCT_FROM_FILE_FAILURE,
  PRINT_RECORDS_FAILURE,
} from "../actions/InventoryAction";

const initialState = {
  loading: false,
  error: null,
  inventory: [],
  recordLength: 0,
};

const InventoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_LIST_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        inventory: action.payload.inventory,
        recordLength: action.payload.totalProducts,
      };
    case FETCH_PRODUCT_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_MANY_PRODUCT_FAILURE:
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
    case CREATE_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case IMPORT_PRODUCT_FROM_FILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_PRODUCT_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default InventoryReducer;
