import axios from "../../../masterPage/utils/AxiosInstance";
import { handlePDF } from "../../../masterPage/utils/HandlePDF";

export const FETCH_VENDOR_LIST_START = "FETCH_VENDOR_LIST_START";
export const FETCH_VENDOR_LIST_SUCCESS = "FETCH_VENDOR_LIST_SUCCESS";
export const FETCH_VENDOR_LIST_FAILURE = "FETCH_VENDOR_LIST_FAILURE";
export const DELETE_MANY_VENDOR_FAILURE = "DELETE_MANY_VENDOR_FAILURE";
export const PRINT_RECORDS_FAILURE = "PRINT_RECORDS_FAILURE";
export const CREATE_VENDOR_FAILURE = "CREATE_VENDOR_FAILURE";
export const IMPORT_VENDOR_FROM_FILE_FAILURE =
  "IMPORT_VENDOR_FROM_FILE_FAILURE";
export const FETCH_VENDOR_DATA_FAILURE = "FETCH_VENDOR_DATA_FAILURE";

function fetchVendorListStart() {
  return {
    type: FETCH_VENDOR_LIST_START,
  };
}
function fetchVendorListSuccess(data) {
  return {
    type: FETCH_VENDOR_LIST_SUCCESS,
    payload: data,
  };
}
function fetchVendorListFailure(error) {
  return {
    type: FETCH_VENDOR_LIST_FAILURE,
    payload: error,
  };
}

function deleteManyVendorFailure(error) {
  return {
    type: DELETE_MANY_VENDOR_FAILURE,
    payload: error,
  };
}
function createVendorFailure(error) {
  return {
    type: CREATE_VENDOR_FAILURE,
    payload: error,
  };
}
function importVendorFromFileFailure(error) {
  return {
    type: IMPORT_VENDOR_FROM_FILE_FAILURE,
    payload: error,
  };
}
function fetchVendorDataFailure(error) {
  return { type: FETCH_VENDOR_DATA_FAILURE, payload: error };
}

export function fetchVendorList(page, limit) {
  return async function (dispatch) {
    try {
      dispatch(fetchVendorListStart());
      const response = await axios.get(
        `/user/vendor/vendor-list?page=${page}&limit=${limit}`
      );
      dispatch(fetchVendorListSuccess(response.data));
    } catch (error) {
      console.error(error);
      dispatch(fetchVendorListFailure(error));
    }
  };
}

export function deleteManyVendor(vendors, page, limit) {
  return async function (dispatch) {
    try {
      await axios.post("/user/vendor/delete-many", vendors);
      dispatch(fetchVendorList(page, limit));
    } catch (error) {
      dispatch(deleteManyVendorFailure(error));
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
      await handlePDF("/user/vendor/print", records);
    } catch (error) {
      console.error(error);
      dispatch(printRecordsFailure(error));
    }
  };
}

export function createVendor(vendor, page, limit) {
  return async function (dispatch) {
    try {
      await axios.post("/user/vendor/create-vendor", vendor);
      dispatch(fetchVendorList(page, limit));
    } catch (error) {
      console.error(error);
      dispatch(createVendorFailure(error));
    }
  };
}

export function importVendorFromFile(file, page, limit) {
  return async function (dispatch) {
    try {
      const formData = new FormData();
      formData.append("file", file);
      await axios.post("/user/vendor/create-many", formData);
      dispatch(fetchVendorList(page, limit));
    } catch (error) {
      console.error(error);
      dispatch(importVendorFromFileFailure(error));
    }
  };
}

export function fetchVendorData(records) {
  return async function (dispatch) {
    try {
      const response = await axios.post("/user/vendor/vendor-data", records);
      return response.data;
    } catch (error) {
      console.error(error);
      dispatch(fetchVendorDataFailure(error));
    }
  };
}
