import { createAccountant, deleteManyAccountant, fetchAccountantData, fetchAccountantList, importAccountantFromFile, printRecords } from "../actions/AccountantAction.js";

export function mapStateToProps(state) {
  return {
    accountantList: state.AccountantReducer ? state.AccountantReducer.accountantList : [],
    recordLength: state.AccountantReducer ? state.AccountantReducer.recordLength : 0,
    loading: state.AccountantReducer ? state.AccountantReducer.loading : false,
    permissions: state.AuthenticationReducer
      ? state.AuthenticationReducer.user.permissions
      : undefined,
  };
}

export function mapDispatchToProp(dispatch) {
  return {
    fetchRecordList: (page, limit) => dispatch(fetchAccountantList(page, limit)),
    deleteManyRecord: (records, page, limit) =>
      dispatch(deleteManyAccountant(records, page, limit)),
    printRecords: (records) => dispatch(printRecords(records)),
    createRecord: (record, page, limit) =>
      dispatch(createAccountant(record, page, limit)),
    importRecordFromFile: (file, page, limit) =>
      dispatch(importAccountantFromFile(file, page, limit)),
    fetchRecordData: (records) => dispatch(fetchAccountantData(records)),
  };
}
