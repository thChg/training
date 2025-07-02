import {
  FETCH_VENDOR_LIST_START,
  FETCH_VENDOR_LIST_FAILURE,
  FETCH_VENDOR_LIST_SUCCESS,
  FETCH_VENDOR_DATA_FAILURE,
  CREATE_VENDOR_FAILURE,
  IMPORT_VENDOR_FROM_FILE_FAILURE,
  DELETE_MANY_VENDOR_FAILURE,
  PRINT_RECORDS_FAILURE,
} from "../actions/VendorAction";

const initialState = {
  loading: false,
  error: null,
  vendorList: [],
  recordLength: 0,
};

const VendorReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_VENDOR_LIST_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_VENDOR_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        vendorList: action.payload.vendors,
        recordLength: action.payload.totalVendors,
      };
    case FETCH_VENDOR_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_MANY_VENDOR_FAILURE:
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
    case CREATE_VENDOR_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case IMPORT_VENDOR_FROM_FILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_VENDOR_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default VendorReducer;
