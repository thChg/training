import {
  DELETE_ORDER_ERROR,
  FETCH_CREATE_ORDER_PERMISSION_FAILURE,
  FETCH_CREATE_ORDER_PERMISSION_START,
  FETCH_CREATE_ORDER_PERMISSION_SUCCESS,
  FETCH_ORDER_FAILURE,
  FETCH_ORDER_START,
  FETCH_ORDER_SUCCESS,
  FETCH_VIEW_PERMISSION_FAILURE,
  FETCH_VIEW_PERMISSION_START,
  FETCH_VIEW_PERMISSION_SUCCESS,
} from "../actions/OrderActions";

const initialState = {
  loading: false,
  orders: [],
  error: null,
  canView: false,
  canCreate: false,
};
 
export default function orderReducer(state = initialState, actions) {
  switch (actions.type) {
    case FETCH_ORDER_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: actions.payload,
      };
    case FETCH_ORDER_FAILURE:
      return {
        ...state,
        loading: false,
        error: actions.payload,
      };
    case FETCH_VIEW_PERMISSION_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_VIEW_PERMISSION_SUCCESS:
      return {
        ...state,
        loading: false,
        canView: true,
      };
    case FETCH_VIEW_PERMISSION_FAILURE:
      return {
        ...state,
        loading: false,
        error: actions.payload,
      };
    case FETCH_CREATE_ORDER_PERMISSION_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_CREATE_ORDER_PERMISSION_SUCCESS:
      return {
        ...state,
        loading: false,
        canCreate: true,
      };
    case FETCH_CREATE_ORDER_PERMISSION_FAILURE:
      return {
        ...state,
        loading: false,
        error: actions.payload,
      };
    case DELETE_ORDER_ERROR:
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
}
