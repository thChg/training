import axios from "../../../masterPage/utils/AxiosInstance";
import { handlePDF } from "../../../masterPage/utils/HandlePDF";

export const FETCH_FISCAL_PERIOD_LIST_START = "FETCH_FISCAL_PERIOD_LIST_START";
export const FETCH_FISCAL_PERIOD_LIST_SUCCESS =
  "FETCH_FISCAL_PERIOD_LIST_SUCCESS";
export const FETCH_FISCAL_PERIOD_LIST_FAILURE =
  "FETCH_FISCAL_PERIOD_LIST_FAILURE";
export const DELETE_MANY_FISCAL_PERIOD_FAILURE =
  "DELETE_MANY_FISCAL_PERIOD_FAILURE";
export const PRINT_RECORDS_FAILURE = "PRINT_RECORDS_FAILURE";
export const CREATE_FISCAL_PERIOD_FAILURE = "CREATE_FISCAL_PERIOD_FAILURE";
export const IMPORT_FISCAL_PERIOD_FROM_FILE_FAILURE =
  "IMPORT_FISCAL_PERIOD_FROM_FILE_FAILURE";
export const FETCH_FISCAL_PERIOD_DATA_FAILURE =
  "FETCH_FISCAL_PERIOD_DATA_FAILURE";
export const CLOSE_FISCAL_PERIOD_FAILURE = "CLOSE_FISCAL_PERIOD_FAILURE";

function fetchFiscalPeriodListStart() {
  return {
    type: FETCH_FISCAL_PERIOD_LIST_START,
  };
}
function fetchFiscalPeriodListSuccess(data) {
  return {
    type: FETCH_FISCAL_PERIOD_LIST_SUCCESS,
    payload: data,
  };
}
function fetchFiscalPeriodListFailure(error) {
  return {
    type: FETCH_FISCAL_PERIOD_LIST_FAILURE,
    payload: error,
  };
}

function deleteManyFiscalPeriodFailure(error) {
  return {
    type: DELETE_MANY_FISCAL_PERIOD_FAILURE,
    payload: error,
  };
}
function createFiscalPeriodFailure(error) {
  return {
    type: CREATE_FISCAL_PERIOD_FAILURE,
    payload: error,
  };
}
function importFiscalPeriodFromFileFailure(error) {
  return {
    type: IMPORT_FISCAL_PERIOD_FROM_FILE_FAILURE,
    payload: error,
  };
}
function fetchFiscalPeriodDataFailure(error) {
  return { type: FETCH_FISCAL_PERIOD_DATA_FAILURE, payload: error };
}
function closeFiscalPeriodFailure(error) {
  return {
    type: CLOSE_FISCAL_PERIOD_FAILURE,
    payload: error,
  };
}

export function fetchFiscalPeriodList(page, limit) {
  return async function (dispatch) {
    try {
      dispatch(fetchFiscalPeriodListStart());
      const response = await axios.get(
        `/report/fiscal-period/fiscal-period-list?page=${page}&limit=${limit}`
      );
      dispatch(fetchFiscalPeriodListSuccess(response.data));
    } catch (error) {
      console.error(error);
      dispatch(fetchFiscalPeriodListFailure(error));
    }
  };
}

export function deleteManyFiscalPeriod(fiscalPeriods, page, limit) {
  return async function (dispatch) {
    try {
      await axios.post("/report/fiscal-period/delete-many", fiscalPeriods);
      dispatch(fetchFiscalPeriodList(page, limit));
    } catch (error) {
      dispatch(deleteManyFiscalPeriodFailure(error));
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
      await handlePDF("/report/fiscal-period/print", records);
    } catch (error) {
      console.error(error);
      dispatch(printRecordsFailure(error));
    }
  };
}

export function createFiscalPeriod(fiscalPeriod, page, limit) {
  return async function (dispatch) {
    try {
      await axios.post(
        "/report/fiscal-period/create-fiscal-period",
        fiscalPeriod
      );
      dispatch(fetchFiscalPeriodList(page, limit));
    } catch (error) {
      console.error(error);
      dispatch(createFiscalPeriodFailure(error));
    }
  };
}

export function importFiscalPeriodFromFile(file, page, limit) {
  return async function (dispatch) {
    try {
      const formData = new FormData();
      formData.append("file", file);
      await axios.post("/report/fiscal-period/create-many", formData);
      dispatch(fetchFiscalPeriodList(page, limit));
    } catch (error) {
      console.error(error);
      dispatch(importFiscalPeriodFromFileFailure(error));
    }
  };
}

export function fetchFiscalPeriodData(records) {
  return async function (dispatch) {
    try {
      const response = await axios.post(
        "/report/fiscal-period/fiscal-period-data",
        records
      );
      return response.data;
    } catch (error) {
      console.error(error);
      dispatch(fetchFiscalPeriodDataFailure(error));
    }
  };
}

export function closeFiscalPeriod(id, page, limit) {
  return async function (dispatch) {
    try {
      await axios.put(`/report/fiscal-period/close-fiscal-period/${id}`);
      fetchFiscalPeriodList(page, limit);
    } catch (error) {
      console.error(error);
      dispatch(closeFiscalPeriodFailure(error));
    }
  }
}