import {
  fetchInventorySummaryList,
} from "../actions/InventorySummaryAction";

export function mapStateToProps(state) {
  return {
    state: state,
    inventorySummary: state.InventorySummaryReducer
      ? state.InventorySummaryReducer.inventorySummary
      : [],
    productList: state.ProductReducer ? state.ProductReducer.productList : [],
    recordLength: state.InventorySummaryReducer
      ? state.InventorySummaryReducer.recordLength
      : 0,
    loading: state.InventorySummaryReducer
      ? state.InventorySummaryReducer.loading
      : false,
    permissions: state.AuthenticationReducer
      ? state.AuthenticationReducer.user.permissions
      : [],
    vendorList: state.VendorReducer ? state.VendorReducer.vendorList : [],
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    fetchInventorySummaryList: (page, limit) =>
      dispatch(fetchInventorySummaryList(page, limit)),
  };
}
