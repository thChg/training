import {
  closeFiscalPeriod,
  createFiscalPeriod,
  fetchFiscalPeriodList,
} from "../actions/FiscalPeriodAction";

export function mapStateToProps(state) {
  return {
    state: state,
    fiscalPeriodList: state.FiscalPeriodReducer
      ? state.FiscalPeriodReducer.fiscalPeriodList
      : [],
    recordLength: state.FiscalPeriodReducer
      ? state.FiscalPeriodReducer.recordLength
      : 0,
    loading: state.FiscalPeriodReducer
      ? state.FiscalPeriodReducer.loading
      : false,
    permissions: state.AuthenticationReducer
      ? state.AuthenticationReducer.user.permissions
      : [],
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    fetchFiscalPeriodList: (page, limit) =>
      dispatch(fetchFiscalPeriodList(page, limit)),
    createFiscalPeriod: (fiscalPeriod, page, limit) =>
      dispatch(createFiscalPeriod(fiscalPeriod, page, limit)),
    closeFiscalPeriod: (id, page, limit) =>
      dispatch(closeFiscalPeriod(id, page, limit)),
  };
}
