import {
  CREATE_BILL_OF_LADING_FAILURE,
  DELETE_MANY_BILL_OF_LADING_FAILURE,
  FETCH_BILL_OF_LADING_DATA_FAILURE,
  FETCH_BILL_OF_LADING_LIST_FAILURE,
  FETCH_BILL_OF_LADING_LIST_START,
  FETCH_BILL_OF_LADING_LIST_SUCCESS,
  IMPORT_BILL_OF_LADING_FROM_FILE_FAILURE,
  PRINT_RECORDS_FAILURE,
} from "../actions/BillOfLadingAction";

const initialState = {
  loading: false,
  error: null,
  billOfLadingList: [],
  recordLength: 0,
};

const BillOfLadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BILL_OF_LADING_LIST_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_BILL_OF_LADING_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        billOfLadingList: action.payload.billOfLadings,
        recordLength: action.payload.totalBillOfLadings,
      };
    case FETCH_BILL_OF_LADING_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_MANY_BILL_OF_LADING_FAILURE:
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
    case CREATE_BILL_OF_LADING_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case IMPORT_BILL_OF_LADING_FROM_FILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_BILL_OF_LADING_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default BillOfLadingReducer;
