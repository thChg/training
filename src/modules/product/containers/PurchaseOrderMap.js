import { fetchProductList } from "../actions/ProductAction";
import {
  createPurchaseOrder,
  deleteManyPurchaseOrder,
  fetchPurchaseOrderData,
  fetchPurchaseOrderList,
  importPurchaseOrderFromFile,
  printRecords,
} from "../actions/PurchaseOrderAction";

export function mapStateToProps(state) {
  return {
    state: state,
    purchaseOrderList: state.PurchaseOrderReducer
      ? state.PurchaseOrderReducer.purchaseOrderList
      : [],
    productList: state.ProductReducer ? state.ProductReducer.productList : [],
    recordLength: state.PurchaseOrderReducer
      ? state.PurchaseOrderReducer.recordLength
      : 0,
    loading: state.PurchaseOrderReducer
      ? state.PurchaseOrderReducer.loading
      : false,
    permissions: state.AuthenticationReducer
      ? state.AuthenticationReducer.user.permissions
      : [],
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    fetchPurchaseOrderList: (page, limit) =>
      dispatch(fetchPurchaseOrderList(page, limit)),
    deleteManyPurchaseOrder: (purchaseOrders, page, limit) =>
      dispatch(deleteManyPurchaseOrder(purchaseOrders, page, limit)),
    printRecords: (records) => dispatch(printRecords(records)),
    createPurchaseOrder: (purchaseOrder) =>
      dispatch(createPurchaseOrder(purchaseOrder)),
    importPurchaseOrderFromFile: (file, page, limit) =>
      dispatch(importPurchaseOrderFromFile(file, page, limit)),
    fetchPurchaseOrderData: (records) =>
      dispatch(fetchPurchaseOrderData(records)),
    fetchProductList: () => dispatch(fetchProductList()),
  };
}
