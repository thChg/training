import {
  createUser,
  deleteUser,
  fetchUserList,
  updateUser,
  importUserFromFile,
  deleteManyUsers,
  printRecords,
  fetchSelectedRecordData,
} from "../actions/UserManagementAction";
import { fetchRoleList } from "../actions/RoleManagementAction";

export function mapStateToProps(state) {
  return {
    userList: state.UserManagementReducer
      ? state.UserManagementReducer.userList
      : [],
    roleList: state.RoleManagementReducer
      ? state.RoleManagementReducer.roleList
      : [],
    loading: state.UserManagementReducer
      ? state.UserManagementReducer.loading
      : false,
    error: state.UserManagementReducer
      ? state.UserManagementReducer.error
      : null,
    permissions: state.AuthenticationReducer
      ? state.AuthenticationReducer.user.permissions
      : null,
    recordLength: state.UserManagementReducer
      ? state.UserManagementReducer.recordLength
      : 0,
  };
}
export function mapDispatchToProps(dispatch) {
  return {
    fetchUserList: (page, limit) => dispatch(fetchUserList(page, limit)),
    fetchRoleList: () => dispatch(fetchRoleList()),
    deleteUser: (userId, page, limit) =>
      dispatch(deleteUser(userId, page, limit)),
    createUser: (userData, page, limit) =>
      dispatch(createUser(userData, page, limit)),
    updateUser: (userId, userData, page, limit) =>
      dispatch(updateUser(userId, userData, page, limit)),
    importUserFromFile: (file, page, limit) =>
      dispatch(importUserFromFile(file, page, limit)),
    deleteManyUsers: (users, page, limit) => {
      dispatch(deleteManyUsers(users, page, limit));
    },
    printRecords: (records) => dispatch(printRecords(records)),
    fetchSelectedUserData: (users) => dispatch(fetchSelectedRecordData(users)),
  };
}
