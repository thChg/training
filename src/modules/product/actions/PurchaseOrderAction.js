import axios from "../../../masterPage/utils/AxiosInstance";
import { handlePDF } from "../../../masterPage/utils/HandlePDF";

export const FETCH_PURCHASE_ORDER_LIST_START =
  "FETCH_PURCHASE_ORDER_LIST_START";
export const FETCH_PURCHASE_ORDER_LIST_SUCCESS =
  "FETCH_PURCHASE_ORDER_LIST_SUCCESS";
export const FETCH_PURCHASE_ORDER_LIST_FAILURE =
  "FETCH_PURCHASE_ORDER_LIST_FAILURE";
export const DELETE_MANY_PURCHASE_ORDER_FAILURE =
  "DELETE_MANY_PURCHASE_ORDER_FAILURE";
export const PRINT_RECORDS_FAILURE = "PRINT_RECORDS_FAILURE";
export const CREATE_PURCHASE_ORDER_FAILURE = "CREATE_PURCHASE_ORDER_FAILURE";
export const IMPORT_PURCHASE_ORDER_FROM_FILE_FAILURE =
  "IMPORT_PURCHASE_ORDER_FROM_FILE_FAILURE";
export const FETCH_PURCHASE_ORDER_DATA_FAILURE =
  "FETCH_PURCHASE_ORDER_DATA_FAILURE";
export const APPROVE_PURCHASE_ORDER_FAILURE = "APPROVE_PURCHASE_ORDER_FAILURE";

function fetchPurchaseOrderListStart() {
  return {
    type: FETCH_PURCHASE_ORDER_LIST_START,
  };
}
function fetchPurchaseOrderListSuccess(data) {
  return {
    type: FETCH_PURCHASE_ORDER_LIST_SUCCESS,
    payload: data,
  };
}
function fetchPurchaseOrderListFailure(error) {
  return {
    type: FETCH_PURCHASE_ORDER_LIST_FAILURE,
    payload: error,
  };
}

function deleteManyPurchaseOrderFailure(error) {
  return {
    type: DELETE_MANY_PURCHASE_ORDER_FAILURE,
    payload: error,
  };
}
function createPurchaseOrderFailure(error) {
  return {
    type: CREATE_PURCHASE_ORDER_FAILURE,
    payload: error,
  };
}
function importPurchaseOrderFromFileFailure(error) {
  return {
    type: IMPORT_PURCHASE_ORDER_FROM_FILE_FAILURE,
    payload: error,
  };
}
function fetchPurchaseOrderDataFailure(error) {
  return { type: FETCH_PURCHASE_ORDER_DATA_FAILURE, payload: error };
}
function approvePerchaseOrderFailure(error) {
  return {
    type: APPROVE_PURCHASE_ORDER_FAILURE,
    payload: error,
  };
}

export function fetchPurchaseOrderList(page, limit) {
  return async function (dispatch) {
    try {
      dispatch(fetchPurchaseOrderListStart());
      const response = await axios.get(
        `/product/purchase-order/purchase-order-list?page=${page}&limit=${limit}`
      );
      dispatch(fetchPurchaseOrderListSuccess(response.data));
    } catch (error) {
      console.error(error);
      dispatch(fetchPurchaseOrderListFailure(error));
    }
  };
}

export function deleteManyPurchaseOrder(products, page, limit) {
  return async function (dispatch) {
    try {
      await axios.post("/product/vendor/delete-many", products);
      dispatch(fetchPurchaseOrderList(page, limit));
    } catch (error) {
      dispatch(deleteManyPurchaseOrderFailure(error));
      console.error(error);
    }
  };
}

export function printRecordsFailure(error) {
  return {
    type: PRINT_RECORDS_FAILURE,
    payload: error,
  };
}

export function printRecords(records) {
  return async function (dispatch) {
    try {
      await handlePDF("/product/vendor/print", records);
    } catch (error) {
      console.error(error);
      dispatch(printRecordsFailure(error));
    }
  };
}

export function createPurchaseOrder(purchaseOrder) {
  return async function (dispatch) {
    try {
      await axios.post(
        "/product/purchase-order/create-purchase-order",
        purchaseOrder
      );
    } catch (error) {
      console.error(error);
      dispatch(createPurchaseOrderFailure(error));
    }
  };
}

export function importPurchaseOrderFromFile(file, page, limit) {
  return async function (dispatch) {
    try {
      const formData = new FormData();
      formData.append("file", file);
      await axios.post("/product/vendor/create-many", formData);
      dispatch(fetchPurchaseOrderList(page, limit));
    } catch (error) {
      console.error(error);
      dispatch(importPurchaseOrderFromFileFailure(error));
    }
  };
}

export function fetchPurchaseOrderData(records) {
  return async function (dispatch) {
    try {
      const response = await axios.post(
        "/product/vendor/product-data",
        records
      );
      return response.data;
    } catch (error) {
      console.error(error);
      dispatch(fetchPurchaseOrderDataFailure(error));
    }
  };
}

export function approvePO(POId, page, limit) {
  return async function (dispatch) {
    try {
      await axios.post("/product/purchase-order/approve", POId);
      dispatch(fetchPurchaseOrderList(page, limit));
    } catch (error) {
      console.error(error);
      dispatch(approvePerchaseOrderFailure(error));
    }
  };
}
