import { fetchVendorList } from "../../community/actions/VendorAction";
import {
  createBillOfLading,
  deleteManyBillOfLading,
  fetchBillOfLadingData,
  fetchBillOfLadingList,
  importBillOfLadingFromFile,
  printRecords,
} from "../actions/BillOfLadingAction";
import { fetchPurchaseOrderList } from "../actions/PurchaseOrderAction";

export function mapStateToProps(state) {
  return {
    state: state,
    billOfLadingList: state.BillOfLadingReducer
      ? state.BillOfLadingReducer.billOfLadingList
      : [],
    recordLength: state.BillOfLadingReducer
      ? state.BillOfLadingReducer.recordLength
      : 0,
    loading: state.BillOfLadingReducer
      ? state.BillOfLadingReducer.loading
      : false,
    permissions: state.AuthenticationReducer
      ? state.AuthenticationReducer.user.permissions
      : [],
    purchaseOrderList: state.PurchaseOrderReducer
      ? state.PurchaseOrderReducer.purchaseOrderList
      : [],
    vendorList: state.VendorReducer ? state.VendorReducer.vendorList : [],
    purchaseOrderList: state.PurchaseOrderReducer
      ? state.PurchaseOrderReducer.purchaseOrderList
      : [],
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    fetchBillOfLadingList: (page, limit) =>
      dispatch(fetchBillOfLadingList(page, limit)),
    deleteManyBillOfLading: (billOfLadings, page, limit) =>
      dispatch(deleteManyBillOfLading(billOfLadings, page, limit)),
    printRecords: (records) => dispatch(printRecords(records)),
    createBillOfLading: (billOfLading) =>
      dispatch(createBillOfLading(billOfLading)),
    importBillOfLadingFromFile: (file, page, limit) =>
      dispatch(importBillOfLadingFromFile(file, page, limit)),
    fetchBillOfLadingData: (records) =>
      dispatch(fetchBillOfLadingData(records)),
    fetchPurchaseOrderList: () => dispatch(fetchPurchaseOrderList()),
    fetchVendorList: () => dispatch(fetchVendorList()),
  };
}
