import {
  FETCH_INVENTORY_SUMMARY_LIST_FAILURE,
  FETCH_INVENTORY_SUMMARY_LIST_START,
  FETCH_INVENTORY_SUMMARY_LIST_SUCCESS,
} from "../actions/InventorySummaryAction";

const initialState = {
  loading: false,
  error: null,
  inventorySummary: [],
  recordLength: 0,
};

const InventorySummaryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_INVENTORY_SUMMARY_LIST_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_INVENTORY_SUMMARY_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        inventorySummary: action.payload.inventorySummary,
        recordLength: action.payload.inventorySummaryLength,
      };
    case FETCH_INVENTORY_SUMMARY_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default InventorySummaryReducer;
