import { fetchPurchaseOrderList } from "../../product/actions/PurchaseOrderAction";

export function mapStateToProps(state) {
  return {
    state: state,
    purchaseOrderList: state.PurchaseOrderReducer
      ? state.PurchaseOrderReducer.purchaseOrderList
      : [],
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
  };
}
