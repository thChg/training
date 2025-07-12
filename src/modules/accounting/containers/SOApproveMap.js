import { resolveSO, fetchSaleOrderList } from "../../sales/actions/SaleOrderAction";

export function mapStateToProps(state) {
  return {
    state: state,
    saleOrderList: state.SaleOrderReducer
      ? state.SaleOrderReducer.saleOrderList
      : [],
    recordLength: state.SaleOrderReducer
      ? state.SaleOrderReducer.recordLength
      : 0,
    loading: state.SaleOrderReducer
      ? state.SaleOrderReducer.loading
      : false,
    permissions: state.AuthenticationReducer
      ? state.AuthenticationReducer.user.permissions
      : [],
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    fetchSaleOrderList: (page, limit) =>
      dispatch(fetchSaleOrderList(page, limit)),
    resolveSO: (data) => dispatch(resolveSO(data, 1, 10)),
  };
}
