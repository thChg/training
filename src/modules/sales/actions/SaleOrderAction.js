import axios from "../../../masterPage/utils/AxiosInstance";
import { handlePDF } from "../../../masterPage/utils/HandlePDF";

export const FETCH_SALE_ORDER_LIST_START = "FETCH_SALE_ORDER_LIST_START";
export const FETCH_SALE_ORDER_LIST_SUCCESS = "FETCH_SALE_ORDER_LIST_SUCCESS";
export const FETCH_SALE_ORDER_LIST_FAILURE = "FETCH_SALE_ORDER_LIST_FAILURE";
export const DELETE_MANY_SALE_ORDER_FAILURE = "DELETE_MANY_SALE_ORDER_FAILURE";
export const PRINT_RECORDS_FAILURE = "PRINT_RECORDS_FAILURE";
export const CREATE_SALE_ORDER_FAILURE = "CREATE_SALE_ORDER_FAILURE";
export const IMPORT_SALE_ORDER_FROM_FILE_FAILURE =
  "IMPORT_SALE_ORDER_FROM_FILE_FAILURE";
export const FETCH_SALE_ORDER_DATA_FAILURE = "FETCH_SALE_ORDER_DATA_FAILURE";
export const APPROVE_SALE_ORDER_FAILURE = "APPROVE_SALE_ORDER_FAILURE";
export const UPDATE_SALE_ORDER_FAILURE = "UPDATE_SALE_ORDER_FAILURE";
export const DELETE_SALE_ORDER_FAILURE = "DELETE_SALE_ORDER_FAILURE"

function fetchSaleOrderListStart() {
  return {
    type: FETCH_SALE_ORDER_LIST_START,
  };
}
function fetchSaleOrderListSuccess(data) {
  return {
    type: FETCH_SALE_ORDER_LIST_SUCCESS,
    payload: data,
  };
}
function fetchSaleOrderListFailure(error) {
  return {
    type: FETCH_SALE_ORDER_LIST_FAILURE,
    payload: error,
  };
}

function deleteManySaleOrderFailure(error) {
  return {
    type: DELETE_MANY_SALE_ORDER_FAILURE,
    payload: error,
  };
}
function createSaleOrderFailure(error) {
  return {
    type: CREATE_SALE_ORDER_FAILURE,
    payload: error,
  };
}
function importSaleOrderFromFileFailure(error) {
  return {
    type: IMPORT_SALE_ORDER_FROM_FILE_FAILURE,
    payload: error,
  };
}
function fetchSaleOrderDataFailure(error) {
  return { type: FETCH_SALE_ORDER_DATA_FAILURE, payload: error };
}
function approveSaleOrderFailure(error) {
  return {
    type: APPROVE_SALE_ORDER_FAILURE,
    payload: error,
  };
}
function updateSaleOrderFailure(error) {
  return {
    type: UPDATE_SALE_ORDER_FAILURE,
    payload: error,
  };
}
function deleteSaleOrderFailure(error) {
  return {
    type: DELETE_SALE_ORDER_FAILURE,
    payload: error,
  };
}

export function fetchSaleOrderList(page, limit) {
  return async function (dispatch) {
    try {
      dispatch(fetchSaleOrderListStart());
      const response = await axios.get(
        `/product/sale-order/sale-order-list?page=${page}&limit=${limit}`
      );
      dispatch(fetchSaleOrderListSuccess(response.data));
    } catch (error) {
      console.error(error);
      dispatch(fetchSaleOrderListFailure(error));
    }
  };
}

export function deleteManySaleOrder(products, page, limit) {
  return async function (dispatch) {
    try {
      await axios.post("/product/vendor/delete-many", products);
      dispatch(fetchSaleOrderList(page, limit));
    } catch (error) {
      dispatch(deleteManySaleOrderFailure(error));
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

export function createSaleOrder(saleOrder) {
  return async function (dispatch) {
    try {
      await axios.post("/product/sale-order/create-sale-order", saleOrder);
    } catch (error) {
      console.error(error);
      dispatch(createSaleOrderFailure(error));
    }
  };
}

export function importSaleOrderFromFile(file, page, limit) {
  return async function (dispatch) {
    try {
      const formData = new FormData();
      formData.append("file", file);
      await axios.post("/product/vendor/create-many", formData);
      dispatch(fetchSaleOrderList(page, limit));
    } catch (error) {
      console.error(error);
      dispatch(importSaleOrderFromFileFailure(error));
    }
  };
}

export function fetchSaleOrderData(records) {
  return async function (dispatch) {
    try {
      const response = await axios.post(
        "/product/vendor/product-data",
        records
      );
      return response.data;
    } catch (error) {
      console.error(error);
      dispatch(fetchSaleOrderDataFailure(error));
    }
  };
}

export function approveSO(SOId, page, limit) {
  return async function (dispatch) {
    try {
      await axios.post("/product/sale-order/approve", SOId);
      dispatch(fetchSaleOrderList(page, limit));
    } catch (error) {
      console.error(error);
      dispatch(approveSaleOrderFailure(error));
    }
  };
}

export function updateSaleOrder(saleOrder) {
  return async function (dispatch) {
    try {
      await axios.delete("/product/sale-order/update", saleOrder);
      dispatch(fetchSaleOrderList());
    } catch (error) {
      console.error(error);
      dispatch(updateSaleOrderFailure(error))
    }
  };
}

export function deleteSaleOrder(saleOrder) {
  return async function (dispatch) {
    try {
      await axios.delete(`/product/sale-order/delete/${saleOrder}`);
      dispatch(fetchSaleOrderList());
    } catch (error) {
      console.error(error);
      dispatch(deleteSaleOrderFailure(error))
    }
  };
} 
