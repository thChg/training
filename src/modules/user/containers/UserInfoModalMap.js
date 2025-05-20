import { SelectUserById } from "../selectors/UserSelector";

export function mapStateToProps(state) {
  const selectedUserId = state.UserManagementReducer?.selectedUserId;

  if (!selectedUserId) {
    return {
      selectedUserId: null,
      user: null,
    };
  }

  return {
    selectedUserId,
    user: SelectUserById(state, selectedUserId),
  };
}

export function mapDispatchToProps(dispatch) {
  return {};
}
