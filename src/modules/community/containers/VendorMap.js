import { fetchPurchaseOrderList } from "../../product/actions/PurchaseOrderAction.js";
import {
  createVendor,
  deleteManyVendor,
  fetchVendorData,
  fetchVendorList,
  importVendorFromFile,
  printRecords,
} from "../actions/VendorAction.js";

export function mapStateToProps(state) {
  return {
    recordList: state.VendorReducer ? state.VendorReducer.vendorList : [],
    recordLength: state.VendorReducer ? state.VendorReducer.recordLength : 0,
    loading: state.VendorReducer ? state.VendorReducer.loading : false,
    permissions: state.AuthenticationReducer
      ? state.AuthenticationReducer.user.permissions
      : undefined,
    purchaseOrderList: state.PurchaseOrderReducer
      ? state.PurchaseOrderReducer.purchaseOrderList
      : [],
  };
}

export function mapDispatchToProp(dispatch) {
  return {
    fetchRecordList: (page, limit) => dispatch(fetchVendorList(page, limit)),
    deleteManyRecord: (records, page, limit) =>
      dispatch(deleteManyVendor(records, page, limit)),
    printRecords: (records) => dispatch(printRecords(records)),
    createRecord: (record, page, limit) =>
      dispatch(createVendor(record, page, limit)),
    importRecordFromFile: (file, page, limit) =>
      dispatch(importVendorFromFile(file, page, limit)),
    fetchRecordData: (records) => dispatch(fetchVendorData(records)),
    fetchPurchaseOrderList: () => dispatch(fetchPurchaseOrderList()),
  };
}
