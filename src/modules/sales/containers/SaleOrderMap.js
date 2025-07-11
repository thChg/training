import { fetchCustomerList } from "../../community/actions/CustomerAction";
import { fetchProductList } from "../../product/actions/ProductAction";
import {
  createSaleOrder,
  deleteManySaleOrder,
  fetchSaleOrderData,
  fetchSaleOrderList,
  importSaleOrderFromFile,
  printRecords,
  updateSaleOrder,
  deleteSaleOrder
} from "../actions/SaleOrderAction";

export function mapStateToProps(state) {
  return {
    state: state,
    saleOrderList: state.SaleOrderReducer
      ? state.SaleOrderReducer.saleOrderList
      : [],
    productList: state.ProductReducer ? state.ProductReducer.productList : [],
    recordLength: state.SaleOrderReducer
      ? state.SaleOrderReducer.recordLength
      : 0,
    loading: state.SaleOrderReducer ? state.SaleOrderReducer.loading : false,
    permissions: state.AuthenticationReducer
      ? state.AuthenticationReducer.user.permissions
      : [],
    customerList: state.CustomerReducer
      ? state.CustomerReducer.customerList
      : [],
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    fetchSaleOrderList: (page, limit) =>
      dispatch(fetchSaleOrderList(page, limit)),
    deleteManySaleOrder: (saleOrders, page, limit) =>
      dispatch(deleteManySaleOrder(saleOrders, page, limit)),
    printRecords: (records) => dispatch(printRecords(records)),
    createSaleOrder: (saleOrder) => dispatch(createSaleOrder(saleOrder)),
    importSaleOrderFromFile: (file, page, limit) =>
      dispatch(importSaleOrderFromFile(file, page, limit)),
    fetchSaleOrderData: (records) => dispatch(fetchSaleOrderData(records)),
    fetchProductList: () => dispatch(fetchProductList()),
    fetchCustomerList: () => dispatch(fetchCustomerList()),
    updateSaleOrder: (saleOrder) => dispatch(updateSaleOrder(saleOrder)),
    deleteSaleOrder: (saleOrder) => dispatch(deleteSaleOrder(saleOrder)),
  };
}
