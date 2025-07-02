import axios from "../../../masterPage/utils/AxiosInstance";
import { handlePDF } from "../../../masterPage/utils/HandlePDF";

export const FETCH_ACCOUNTANT_LIST_START = "FETCH_ACCOUNTANT_LIST_START";
export const FETCH_ACCOUNTANT_LIST_SUCCESS = "FETCH_ACCOUNTANT_LIST_SUCCESS";
export const FETCH_ACCOUNTANT_LIST_FAILURE = "FETCH_ACCOUNTANT_LIST_FAILURE";
export const DELETE_MANY_ACCOUNTANT_FAILURE = "DELETE_MANY_ACCOUNTANT_FAILURE";
export const PRINT_RECORDS_FAILURE = "PRINT_RECORDS_FAILURE";
export const CREATE_ACCOUNTANT_FAILURE = "CREATE_ACCOUNTANT_FAILURE";
export const IMPORT_ACCOUNTANT_FROM_FILE_FAILURE =
  "IMPORT_ACCOUNTANT_FROM_FILE_FAILURE";
export const FETCH_ACCOUNTANT_DATA_FAILURE = "FETCH_ACCOUNTANT_DATA_FAILURE";

function fetchAccountantListStart() {
  return {
    type: FETCH_ACCOUNTANT_LIST_START,
  };
}
function fetchAccountantListSuccess(data) {
  return {
    type: FETCH_ACCOUNTANT_LIST_SUCCESS,
    payload: data,
  };
}
function fetchAccountantListFailure(error) {
  return {
    type: FETCH_ACCOUNTANT_LIST_FAILURE,
    payload: error,
  };
}

function deleteManyAccountantFailure(error) {
  return {
    type: DELETE_MANY_ACCOUNTANT_FAILURE,
    payload: error,
  };
}
function createAccountantFailure(error) {
  return {
    type: CREATE_ACCOUNTANT_FAILURE,
    payload: error,
  };
}
function importAccountantFromFileFailure(error) {
  return {
    type: IMPORT_ACCOUNTANT_FROM_FILE_FAILURE,
    payload: error,
  };
}
function fetchAccountantDataFailure(error) {
  return { type: FETCH_ACCOUNTANT_DATA_FAILURE, payload: error };
}

export function fetchAccountantList(page, limit) {
  return async function (dispatch) {
    try {
      dispatch(fetchAccountantListStart());
      const response = await axios.get(
        `/user/accountant/accountant-list?page=${page}&limit=${limit}`
      );
      dispatch(fetchAccountantListSuccess(response.data));
    } catch (error) {
      console.error(error);
      dispatch(fetchAccountantListFailure(error));
    }
  };
}

export function deleteManyAccountant(accountants, page, limit) {
  return async function (dispatch) {
    try {
      await axios.post("/user/accountant/delete-many", accountants);
      dispatch(fetchAccountantList(page, limit));
    } catch (error) {
      dispatch(deleteManyAccountantFailure(error));
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
      await handlePDF("/user/accountant/print", records);
    } catch (error) {
      console.error(error);
      dispatch(printRecordsFailure(error));
    }
  };
}

export function createAccountant(accountant, page, limit) {
  return async function (dispatch) {
    try {
      await axios.post("/user/accountant/create-accountant", accountant);
      dispatch(fetchAccountantList(page, limit));
    } catch (error) {
      console.error(error);
      dispatch(createAccountantFailure(error));
    }
  };
}

export function importAccountantFromFile(file, page, limit) {
  return async function (dispatch) {
    try {
      const formData = new FormData();
      formData.append("file", file);
      await axios.post("/user/accountant/create-many", formData);
      dispatch(fetchAccountantList(page, limit));
    } catch (error) {
      console.error(error);
      dispatch(importAccountantFromFileFailure(error));
    }
  };
}

export function fetchAccountantData(records) {
  return async function (dispatch) {
    try {
      const response = await axios.post("/user/accountant/accountant-data", records);
      return response.data;
    } catch (error) {
      console.error(error);
      dispatch(fetchAccountantDataFailure(error));
    }
  };
}
