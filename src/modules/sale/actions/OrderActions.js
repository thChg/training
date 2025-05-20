import axios from "../../../masterPage/utils/AxiosInstance";
export const FETCH_ORDER_START = "FETCH_ORDER_START";
export const FETCH_ORDER_SUCCESS = "FETCH_ORDER_SUCCESS";
export const FETCH_ORDER_FAILURE = "FETCH_ORDER_FAILURE";
export const FETCH_VIEW_PERMISSION_START = "FETCH_VIEW_PERMISSION";
export const FETCH_VIEW_PERMISSION_SUCCESS = "FETCH_VIEW_PERMISSION_SUCCESS";
export const FETCH_VIEW_PERMISSION_FAILURE = "FETCH_VIEW_PERMISSION_FAILURE";
export const FETCH_CREATE_ORDER_PERMISSION_START =
  "FETCH_CREATE_ORDER_PERMISSION_START";
export const FETCH_CREATE_ORDER_PERMISSION_SUCCESS =
  "FETCH_CREATE_ORDER_PERMISSION_SUCCESS";
export const FETCH_CREATE_ORDER_PERMISSION_FAILURE =
  "FETCH_CREATE_ORDER_PERMISSION_FAILURE";
export const DELETE_ORDER_ERROR = "DELETE_ORDER_ERROR";

export function fetchOrderRequest() {
  return {
    type: FETCH_ORDER_START,
  };
}
export function fetchOrderSuccess(data) {
  return {
    type: FETCH_ORDER_SUCCESS,
    payload: data,
  };
}
export function fetchOrderFailure(error) {
  return {
    type: FETCH_ORDER_FAILURE,
    payload: error.response.data.message,
  };
}

export function fetchViewPermissionStart() {
  return {
    type: FETCH_VIEW_PERMISSION_START,
  };
}

export function fetchViewPermissionSuccess() {
  return {
    type: FETCH_VIEW_PERMISSION_SUCCESS,
  };
}

export function fetchViewPermissionFailure(error) {
  return {
    type: FETCH_VIEW_PERMISSION_FAILURE,
    payload: error.response.data.message,
  };
}

export function fetchCreateOrderPermissionStart() {
  return {
    type: FETCH_CREATE_ORDER_PERMISSION_START,
  }
}

export function fetchCreateOrderPermissionSuccess() {
  return {
    type: FETCH_CREATE_ORDER_PERMISSION_SUCCESS,
  }
}

export function fetchCreateOrderPermissionFailure(error) {
  return {
    type: FETCH_CREATE_ORDER_PERMISSION_FAILURE,
    payload: error.response.data.message,
  }
}

export function deleteOrderError() {
  return (dispatch) => {
    dispatch({ type: DELETE_ORDER_ERROR });
  };
}

export function fetchOrder() {
  return async (dispatch) => {
    dispatch(fetchOrderRequest());
    try {
      const response = await axios.get("/order/get");
      dispatch(fetchOrderSuccess(response.data));
    } catch (error) {
      dispatch(fetchOrderFailure(error));
    }
  };
}

export function fetchViewPermission() {
  return async (dispatch) => {
    dispatch(fetchViewPermissionStart());
    try {
      await axios.get("/order/get/permissions");
      dispatch(fetchViewPermissionSuccess());
    } catch (error) {
      dispatch(fetchViewPermissionFailure(error));
    }
  };
}

export function fetchCreateOrderPermission() {
  return async (dispatch) => {
    dispatch(fetchCreateOrderPermissionStart());
    try {
      await axios.get("/order/create/permissions");
      dispatch(fetchCreateOrderPermissionSuccess());
    } catch (error) {
      dispatch(fetchCreateOrderPermissionFailure(error));
    }
  };
}