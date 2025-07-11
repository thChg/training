import { fetchDeliveryNoteList, resolveDeliveryNote } from "../actions/DeliveryNoteAction";

export function mapStateToProps(state) {
  return {
    deliveryNoteList: state.DeliveryNoteReducer
      ? state.DeliveryNoteReducer.deliveryNoteList
      : [],
    recordLength: state.DeliveryNoteReducer
      ? state.DeliveryNoteReducer.recordLength
      : 0,
    loading: state.DeliveryNoteReducer
      ? state.DeliveryNoteReducer.loading
      : false,
    permissions: state.AuthenticationReducer
      ? state.AuthenticationReducer.user.permissions
      : undefined,
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    fetchRecordList: (page, limit) =>
      dispatch(fetchDeliveryNoteList(page, limit)),
    resolveDeliveryNote: (id, action) => dispatch(resolveDeliveryNote(id, action)),
  };
}
