import axios from "../../../masterPage/utils/AxiosInstance";
import { handlePDF } from "../../../masterPage/utils/HandlePDF";
import { fetchPurchaseOrderList } from "./PurchaseOrderAction";

export const FETCH_BILL_OF_LADING_LIST_START =
  "FETCH_BILL_OF_LADING_LIST_START";
export const FETCH_BILL_OF_LADING_LIST_SUCCESS =
  "FETCH_BILL_OF_LADING_LIST_SUCCESS";
export const FETCH_BILL_OF_LADING_LIST_FAILURE =
  "FETCH_BILL_OF_LADING_LIST_FAILURE";
export const DELETE_MANY_BILL_OF_LADING_FAILURE =
  "DELETE_MANY_BILL_OF_LADING_FAILURE";
export const PRINT_RECORDS_FAILURE = "PRINT_RECORDS_FAILURE";
export const CREATE_BILL_OF_LADING_FAILURE = "CREATE_BILL_OF_LADING_FAILURE";
export const IMPORT_BILL_OF_LADING_FROM_FILE_FAILURE =
  "IMPORT_BILL_OF_LADING_FROM_FILE_FAILURE";
export const FETCH_BILL_OF_LADING_DATA_FAILURE =
  "FETCH_BILL_OF_LADING_DATA_FAILURE";

function fetchBillOfLadingListStart() {
  return {
    type: FETCH_BILL_OF_LADING_LIST_START,
  };
}
function fetchBillOfLadingListSuccess(data) {
  return {
    type: FETCH_BILL_OF_LADING_LIST_SUCCESS,
    payload: data,
  };
}
function fetchBillOfLadingListFailure(error) {
  return {
    type: FETCH_BILL_OF_LADING_LIST_FAILURE,
    payload: error,
  };
}

function deleteManyBillOfLadingFailure(error) {
  return {
    type: DELETE_MANY_BILL_OF_LADING_FAILURE,
    payload: error,
  };
}
function createBillOfLadingFailure(error) {
  return {
    type: CREATE_BILL_OF_LADING_FAILURE,
    payload: error,
  };
}
function importBillOfLadingFromFileFailure(error) {
  return {
    type: IMPORT_BILL_OF_LADING_FROM_FILE_FAILURE,
    payload: error,
  };
}
function fetchBillOfLadingDataFailure(error) {
  return { type: FETCH_BILL_OF_LADING_DATA_FAILURE, payload: error };
}

export function fetchBillOfLadingList(page, limit) {
  return async function (dispatch) {
    try {
      dispatch(fetchBillOfLadingListStart());
      const response = await axios.get(
        `/product/bill-of-lading/bill-of-lading-list?page=${page}&limit=${limit}`
      );
      dispatch(fetchBillOfLadingListSuccess(response.data));
    } catch (error) {
      console.error(error);
      dispatch(fetchBillOfLadingListFailure(error));
    }
  };
}

export function deleteManyBillOfLading(products, page, limit) {
  return async function (dispatch) {
    try {
      await axios.post("/product/bill-of-lading/delete-many", products);
      dispatch(fetchBillOfLadingList(page, limit));
    } catch (error) {
      dispatch(deleteManyBillOfLadingFailure(error));
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
      await handlePDF("/product/bill-of-lading/print", records);
    } catch (error) {
      console.error(error);
      dispatch(printRecordsFailure(error));
    }
  };
}

export function createBillOfLading(billOfLading) {
  return async function (dispatch) {
    try {
      await axios.post(
        "/product/bill-of-lading/create-bill-of-lading",
        billOfLading
      );
      dispatch(fetchBillOfLadingList(1, 10));
      dispatch(fetchPurchaseOrderList(1, 10));
    } catch (error) {
      console.error(error);
      dispatch(createBillOfLadingFailure(error));
    }
  };
}

export function importBillOfLadingFromFile(file, page, limit) {
  return async function (dispatch) {
    try {
      const formData = new FormData();
      formData.append("file", file);
      await axios.post("/product/bill-of-lading/create-many", formData);
      dispatch(fetchBillOfLadingList(page, limit));
    } catch (error) {
      console.error(error);
      dispatch(importBillOfLadingFromFileFailure(error));
    }
  };
}

export function fetchBillOfLadingData(records) {
  return async function (dispatch) {
    try {
      const response = await axios.post(
        "/product/bill-of-lading/bill-of-lading-data",
        records
      );
      return response.data;
    } catch (error) {
      console.error(error);
      dispatch(fetchBillOfLadingDataFailure(error));
    }
  };
}
