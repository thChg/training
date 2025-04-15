import { fetchEmployee } from "../reducers/EmployeeReducer";

export function mapStateToProps(state) {
  return {
    employees: state.employeeReducer ? state.employeeReducer.employees : [],
    loading: state.employeeReducer ? state.employeeReducer.loading : false,
    error: state.employeeReducer ? state.employeeReducer.error : null,
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    fetchEmployee: () => dispatch(fetchEmployee()),
  };
}
