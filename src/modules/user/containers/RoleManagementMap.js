import {
  createRole,
  deleteManyRoles,
  deleteRole,
  fetchRoleList,
  updateRole,
} from "../actions/RoleManagementAction";
import { fetchAccessList } from "../actions/AccessManagementAction";
import { setSelectedRole } from "../actions/RoleInfoAction";

export function mapStateToProps(state) {
  return {
    roleList: state.RoleManagementReducer
      ? state.RoleManagementReducer.roleList
      : [],
    accessList: state.AccessManagementReducer
      ? state.AccessManagementReducer.accessList
      : [],
    loading: state.UserManagementReducer
      ? state.RoleManagementReducer.loading
      : false,
    error: state.UserManagementReducer
      ? state.RoleManagementReducer.error
      : null,
    permissions: state.AuthenticationReducer
      ? state.AuthenticationReducer.user.permissions
      : null,
    selectedRoleId: state.RoleInfoReducer
      ? state.RoleInfoReducer.selectedRoleId
      : null,
    recordLength: state.RoleManagementReducer
      ? state.RoleManagementReducer.recordLength
      : 0,
  };
}
export function mapDispatchToProps(dispatch) {
  return {
    fetchRoleList: (page, limit) => dispatch(fetchRoleList(page, limit)),
    fetchAccessList: () => dispatch(fetchAccessList()),
    setSelectedRole: (roleId) => dispatch(setSelectedRole(roleId)),
    createRole: (roleData) => dispatch(createRole(roleData)),
    updateRole: (roleId, roleData) => dispatch(updateRole(roleId, roleData)),
    deleteRole: (roleId) => dispatch(deleteRole(roleId)),
    deleteManyRoles: (roles, page, limit) =>
      dispatch(deleteManyRoles(roles, page, limit)),
  };
}
