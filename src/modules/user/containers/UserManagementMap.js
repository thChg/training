import { fetchUserList } from "../actions/FetchUserListAction";
import { setSelectedUserId } from "../actions/SelectedUserIdAction";

export function mapStateToProps(state) {
  return {
    userList: state.UserManagementReducer ? state.UserManagementReducer.userList : [],
    loading: state.UserManagementReducer ? state.UserManagementReducer.loading : false,
    error: state.UserManagementReducer ? state.UserManagementReducer.error : null,
    permissions: state.AuthenticationReducer ? state.AuthenticationReducer.user.permissions : null,
    selectedUserId: state.UserManagementReducer ? state.UserManagementReducer.selectedUserId : null,
  };
}
export function mapDispatchToProps(dispatch) {
  return {
    fetchUserList: () => dispatch(fetchUserList()),
    setSelectedUserId: (userId) => dispatch(setSelectedUserId(userId)),
    clearSelectedUserId: () => dispatch(setSelectedUserId(null)),
  };
}
