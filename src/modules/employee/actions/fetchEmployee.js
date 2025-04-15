export const FETCH_EMPLOYEE_START = "FETCH_EMPLOYEE_START";
export const FETCH_EMPLOYEE_SUCCESS = "FETCH_EMPLOYEE_SUCCESS";
export const FETCH_EMPLOYEE_FAILURE = "FETCH_EMPLOYEE_FAILURE";

export function fetchEmployeeRequest() {
  return {
    type: FETCH_EMPLOYEE_START,
  };
}

export function fetchEmployeeSuccess(data) {
  return {
    type: FETCH_EMPLOYEE_SUCCESS,
    payload: data,
  };
}

export function fetchEmployeeFailure(error) {
  return {
    type: FETCH_EMPLOYEE_FAILURE,
    payload: error,
  };
}
