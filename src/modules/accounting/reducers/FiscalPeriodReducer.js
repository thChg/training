import {
  CLOSE_FISCAL_PERIOD_FAILURE,
  FETCH_FISCAL_PERIOD_LIST_FAILURE,
  FETCH_FISCAL_PERIOD_LIST_START,
  FETCH_FISCAL_PERIOD_LIST_SUCCESS,
} from "../actions/FiscalPeriodAction";

const initialState = {
  loading: false,
  error: null,
  fiscalPeriodList: [],
  recordLength: 0,
};

const FiscalPeriodReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FISCAL_PERIOD_LIST_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_FISCAL_PERIOD_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        fiscalPeriodList: action.payload.fiscalPeriods,
        recordLength: action.payload.totalFiscalPeriods,
      };
    case FETCH_FISCAL_PERIOD_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLOSE_FISCAL_PERIOD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default FiscalPeriodReducer;
