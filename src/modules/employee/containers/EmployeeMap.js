import { fetchEmployee } from "../reducers/EmployeeReducer";

export function mapStateToProps(state) {
  return {
    employeeList: state.employeeReducer ? state.employeeReducer.employees : [],
    loading: state.employeeReducer ? state.employeeReducer.loading : false,
    error: state.employeeReducer ? state.employeeReducer.error : null,
    permissions: state.AuthenticationReducer
      ? state.AuthenticationReducer.user.permissions
      : null,
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    fetchEmployeeList: () => dispatch(fetchEmployee()),
  };
}
