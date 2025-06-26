import axios from "../../../masterPage/utils/AxiosInstance";
import { handlePDF } from "../../../masterPage/utils/HandlePDF";

export const FETCH_CUSTOMER_LIST_START = "FETCH_CUSTOMER_LIST_START";
export const FETCH_CUSTOMER_LIST_SUCCESS = "FETCH_CUSTOMER_LIST_SUCCESS";
export const FETCH_CUSTOMER_LIST_FAILURE = "FETCH_CUSTOMER_LIST_FAILURE";
export const DELETE_MANY_CUSTOMER_FAILURE = "DELETE_MANY_CUSTOMER_FAILURE";
export const PRINT_RECORDS_FAILURE = "PRINT_RECORDS_FAILURE";
export const CREATE_CUSTOMER_FAILURE = "CREATE_CUSTOMER_FAILURE";
export const IMPORT_CUSTOMER_FROM_FILE_FAILURE =
  "IMPORT_CUSTOMER_FROM_FILE_FAILURE";
export const FETCH_CUSTOMER_DATA_FAILURE = "FETCH_CUSTOMER_DATA_FAILURE";

function fetchCustomerListStart() {
  return {
    type: FETCH_CUSTOMER_LIST_START,
  };
}
function fetchCustomerListSuccess(data) {
  return {
    type: FETCH_CUSTOMER_LIST_SUCCESS,
    payload: data,
  };
}
function fetchCustomerListFailure(error) {
  return {
    type: FETCH_CUSTOMER_LIST_FAILURE,
    payload: error,
  };
}

function deleteManyCustomerFailure(error) {
  return {
    type: DELETE_MANY_CUSTOMER_FAILURE,
    payload: error,
  };
}
function createCustomerFailure(error) {
  return {
    type: CREATE_CUSTOMER_FAILURE,
    payload: error,
  };
}
function importCustomerFromFileFailure(error) {
  return {
    type: IMPORT_CUSTOMER_FROM_FILE_FAILURE,
    payload: error,
  };
}
function fetchCustomerDataFailure(error) {
  return { type: FETCH_CUSTOMER_DATA_FAILURE, payload: error };
}

export function fetchCustomerList(page, limit) {
  return async function (dispatch) {
    try {
      dispatch(fetchCustomerListStart());
      const response = await axios.get(
        `/user/customer/customer-list?page=${page}&limit=${limit}`
      );
      dispatch(fetchCustomerListSuccess(response.data));
    } catch (error) {
      console.error(error);
      dispatch(fetchCustomerListFailure(error));
    }
  };
}

export function deleteManyCustomer(customers, page, limit) {
  return async function (dispatch) {
    try {
      await axios.post("/user/customer/delete-many", customers);
      dispatch(fetchCustomerList(page, limit));
    } catch (error) {
      dispatch(deleteManyCustomerFailure(error));
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
      await handlePDF("/user/customer/print", records);
    } catch (error) {
      console.error(error);
      dispatch(printRecordsFailure(error));
    }
  };
}

export function createCustomer(customer, page, limit) {
  return async function (dispatch) {
    try {
      await axios.post("/user/customer/create-customer", customer);
      dispatch(fetchCustomerList(page, limit));
    } catch (error) {
      console.error(error);
      dispatch(createCustomerFailure(error));
    }
  };
}

export function importCustomerFromFile(file, page, limit) {
  return async function (dispatch) {
    try {
      const formData = new FormData();
      formData.append("file", file);
      await axios.post("/user/customer/create-many", formData);
      dispatch(fetchCustomerList(page, limit));
    } catch (error) {
      console.error(error);
      dispatch(importCustomerFromFileFailure(error));
    }
  };
}

export function fetchCustomerData(records) {
  return async function (dispatch) {
    try {
      const response = await axios.post(
        "/user/customer/customer-data",
        records
      );
      return response.data;
    } catch (error) {
      console.error(error);
      dispatch(fetchCustomerDataFailure(error));
    }
  };
}
