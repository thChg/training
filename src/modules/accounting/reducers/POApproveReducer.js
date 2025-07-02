import { FETCH_PRODUCT_DATA_FAILURE, PRINT_RECORDS_FAILURE } from "../actions/POApproveAction";

const initialState = {
  loading: false,
  error: null,
};

const POApproveReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRINT_RECORDS_FAILURE:
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

export default POApproveReducer;
