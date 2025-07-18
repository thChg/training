import { fetchSaleOrderList } from "../../sales/actions/SaleOrderAction";
import {
  createCustomer,
  deleteManyCustomer,
  fetchCustomerList,
  printRecords,
  importCustomerFromFile,
  fetchCustomerData,
} from "../actions/CustomerAction";

export function mapStateToProps(state) {
  return {
    customerList: state.CustomerReducer
      ? state.CustomerReducer.customerList
      : [],
    recordLength: state.CustomerReducer
      ? state.CustomerReducer.recordLength
      : 0,
    loading: state.CustomerReducer ? state.CustomerReducer.loading : false,
    permissions: state.AuthenticationReducer
      ? state.AuthenticationReducer.user.permissions
      : undefined,
    saleOrderList: state.SaleOrderReducer
      ? state.SaleOrderReducer.saleOrderList
      : [],
  };
}

export function mapDispatchToProp(dispatch) {
  return {
    fetchCustomerList: (page, limit) =>
      dispatch(fetchCustomerList(page, limit)),
    deleteManyCustomer: (customers, page, limit) =>
      dispatch(deleteManyCustomer(customers, page, limit)),
    printRecords: (records) => dispatch(printRecords(records)),
    createCustomer: (customer, page, limit) =>
      dispatch(createCustomer(customer, page, limit)),
    importCustomerFromFile: (file, page, limit) =>
      dispatch(importCustomerFromFile(file, page, limit)),
    fetchCustomerData: (records) => dispatch(fetchCustomerData(records)),
    fetchSaleOrderList: () => dispatch(fetchSaleOrderList()),
  };
}