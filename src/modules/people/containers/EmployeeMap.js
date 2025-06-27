import {
  createEmployee,
  deleteManyEmployee,
  fetchEmployeeData,
  fetchEmployeeList,
  importEmployeeFromFile,
  printRecords,
} from "../actions/EmployeeAction";

export function mapStateToProps(state) {
  return {
    recordList: state.EmployeeReducer ? state.EmployeeReducer.employeeList : [],
    recordLength: state.EmployeeReducer
      ? state.EmployeeReducer.recordLength
      : 0,
    loading: state.EmployeeReducer ? state.EmployeeReducer.loading : false,
    permissions: state.AuthenticationReducer
      ? state.AuthenticationReducer.user.permissions
      : [],
  };
}

export function mapDispatchToProp(dispatch) {
  return {
    fetchRecordList: (page, limit) => dispatch(fetchEmployeeList(page, limit)),
    deleteManyRecord: (records, page, limit) =>
      dispatch(deleteManyEmployee(records, page, limit)),
    printRecords: (records) => dispatch(printRecords(records)),
    createRecord: (record, page, limit) =>
      dispatch(createEmployee(record, page, limit)),
    importRecordFromFile: (file, page, limit) =>
      dispatch(importEmployeeFromFile(file, page, limit)),
    fetchRecordData: (records) => dispatch(fetchEmployeeData(records)),
  };
}
