import axios from "../../../masterPage/utils/AxiosInstance";
import { handlePDF } from "../../../masterPage/utils/HandlePDF";

export const FETCH_EMPLOYEE_LIST_START = "FETCH_EMPLOYEE_LIST_START";
export const FETCH_EMPLOYEE_LIST_SUCCESS = "FETCH_EMPLOYEE_LIST_SUCCESS";
export const FETCH_EMPLOYEE_LIST_FAILURE = "FETCH_EMPLOYEE_LIST_FAILURE";
export const DELETE_MANY_EMPLOYEE_FAILURE = "DELETE_MANY_EMPLOYEE_FAILURE";
export const PRINT_RECORDS_FAILURE = "PRINT_RECORDS_FAILURE";
export const CREATE_EMPLOYEE_FAILURE = "CREATE_EMPLOYEE_FAILURE";
export const IMPORT_EMPLOYEE_FROM_FILE_FAILURE =
  "IMPORT_EMPLOYEE_FROM_FILE_FAILURE";
export const FETCH_EMPLOYEE_DATA_FAILURE = "FETCH_EMPLOYEE_DATA_FAILURE";

function fetchEmployeeListStart() {
  return {
    type: FETCH_EMPLOYEE_LIST_START,
  };
}
function fetchEmployeeListSuccess(data) {
  return {
    type: FETCH_EMPLOYEE_LIST_SUCCESS,
    payload: data,
  };
}
function fetchEmployeeListFailure(error) {
  return {
    type: FETCH_EMPLOYEE_LIST_FAILURE,
    payload: error,
  };
}

function deleteManyEmployeeFailure(error) {
  return {
    type: DELETE_MANY_EMPLOYEE_FAILURE,
    payload: error,
  };
}
function createEmployeeFailure(error) {
  return {
    type: CREATE_EMPLOYEE_FAILURE,
    payload: error,
  };
}
function importEmployeeFromFileFailure(error) {
  return {
    type: IMPORT_EMPLOYEE_FROM_FILE_FAILURE,
    payload: error,
  };
}
function fetchEmployeeDataFailure(error) {
  return { type: FETCH_EMPLOYEE_DATA_FAILURE, payload: error };
}

export function fetchEmployeeList(page, limit) {
  return async function (dispatch) {
    try {
      dispatch(fetchEmployeeListStart());
      const response = await axios.get(
        `/user/employee/employee-list?page=${page}&limit=${limit}`
      );
      dispatch(fetchEmployeeListSuccess(response.data));
    } catch (error) {
      console.error(error);
      dispatch(fetchEmployeeListFailure(error));
    }
  };
}

export function deleteManyEmployee(employees, page, limit) {
  return async function (dispatch) {
    try {
      await axios.post("/user/employee/delete-many", employees);
      dispatch(fetchEmployeeList(page, limit));
    } catch (error) {
      dispatch(deleteManyEmployeeFailure(error));
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
      await handlePDF("/user/employee/print", records);
    } catch (error) {
      console.error(error);
      dispatch(printRecordsFailure(error));
    }
  };
}

export function createEmployee(employee, page, limit) {
  return async function (dispatch) {
    try {
      await axios.post("/user/employee/create-employee", employee);
      dispatch(fetchEmployeeList(page, limit));
    } catch (error) {
      console.error(error);
      dispatch(createEmployeeFailure(error));
    }
  };
}

export function importEmployeeFromFile(file, page, limit) {
  return async function (dispatch) {
    try {
      const formData = new FormData();
      formData.append("file", file);
      await axios.post("/user/employee/create-many", formData);
      dispatch(fetchEmployeeList(page, limit));
    } catch (error) {
      console.error(error);
      dispatch(importEmployeeFromFileFailure(error));
    }
  };
}

export function fetchEmployeeData(records) {
  return async function (dispatch) {
    try {
      const response = await axios.post("/user/employee/employee-data", records);
      return response.data;
    } catch (error) {
      console.error(error);
      dispatch(fetchEmployeeDataFailure(error));
    }
  };
}
