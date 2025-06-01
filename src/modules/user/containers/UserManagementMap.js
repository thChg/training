import {
  createUser,
  deleteUser,
  fetchUserList,
  updateUser,
} from "../actions/UserManagementAction";
import {
  createRole,
  deleteRole,
  fetchRoleList,
  updateRole,
} from "../actions/RoleManagementAction";
import { fetchAccessList } from "../actions/AccessManagementAction";
import { setSelectedRole } from "../actions/RoleInfoAction";

export function mapStateToProps(state) {
  return {
    userList: state.UserManagementReducer
      ? state.UserManagementReducer.userList
      : [],
    roleList: state.RoleManagementReducer
      ? state.RoleManagementReducer.roleList
      : [],
    accessList: state.AccessManagementReducer
      ? state.AccessManagementReducer.accessList
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
    selectedRoleId: state.RoleInfoReducer
      ? state.RoleInfoReducer.selectedRoleId
      : null,
  };
}
export function mapDispatchToProps(dispatch) {
  return {
    fetchUserList: () => dispatch(fetchUserList()),
    fetchRoleList: () => dispatch(fetchRoleList()),
    fetchAccessList: () => dispatch(fetchAccessList()),
    setSelectedRole: (roleId) => dispatch(setSelectedRole(roleId)),
    deleteUser: (userId) => dispatch(deleteUser(userId)),
    createUser: (userData) => dispatch(createUser(userData)),
    updateUser: (userId, userData) => dispatch(updateUser(userId, userData)),
    createRole: (roleData) => dispatch(createRole(roleData)),
    updateRole: (roleId, roleData) => dispatch(updateRole(roleId, roleData)),
    deleteRole: (roleId) => dispatch(deleteRole(roleId)),
  };
}
