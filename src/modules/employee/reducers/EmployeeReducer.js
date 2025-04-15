import axios from "axios";
import {
  FETCH_EMPLOYEE_FAILURE,
  FETCH_EMPLOYEE_START,
  FETCH_EMPLOYEE_SUCCESS,
  fetchEmployeeFailure,
  fetchEmployeeRequest,
  fetchEmployeeSuccess,
} from "../actions/fetchEmployee";

const initialState = {
  loading: false,
  employees: [],
  error: null,
};

export default function employeeReducer(state = initialState, actions) {
  switch (actions.type) {
    case FETCH_EMPLOYEE_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_EMPLOYEE_SUCCESS:
      return {
        ...state,
        loading: false,
        employees: actions.payload,
      };
    case FETCH_EMPLOYEE_FAILURE:
      return {
        ...state,
        loading: false,
        error: actions.payload,
      };
    default:
      return state;
  }
}
  
export function fetchEmployee() {
  return async (dispatch) => {
    dispatch(fetchEmployeeRequest());
    try {
      const response = await axios.get("http://localhost:5050/employee/get");
      dispatch(fetchEmployeeSuccess(response.data));
    } catch (error) {
      dispatch(fetchEmployeeFailure(error.message));
    }
  }
}
