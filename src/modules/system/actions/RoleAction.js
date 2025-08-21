import { loginSuccess } from "../../../masterPage/auth/AuthenticationAction";
import axios from "../../../masterPage/utils/AxiosInstance";

export const FETCH_ROLE_LIST_START = "FETCH_ROLE_LIST_START";
export const FETCH_ROLE_LIST_SUCCESS = "FETCH_ROLE_LIST_SUCCESS";
export const FETCH_ROLE_LIST_FAILURE = "FETCH_ROLE_LIST_FAILURE";
export const CREATE_ROLE_FAILURE = "CREATE_ROLE_FAILURE";
export const UPDATE_ROLE_FAILURE = "UPDATE_ROLE_FAILURE";
export const DELETE_ROLE_FAILURE = "DELETE_ROLE_FAILURE";
export const DELETE_MANY_ROLES_FAILURE = "DELETE_MANY_ROLES_FAILURE";

function fetchRoleListStart() {
  return {
    type: FETCH_ROLE_LIST_START,
  };
}
function fetchRoleListSuccess(roleList) {
  return {
    type: FETCH_ROLE_LIST_SUCCESS,
    payload: roleList,
  };
}
function fetchRoleListFailure(error) {
  return {
    type: FETCH_ROLE_LIST_FAILURE,
    payload: error,
  };
}
function createRoleFailure(error) {
  return {
    type: CREATE_ROLE_FAILURE,
    payload: error,
  };
}
function updateRoleFailure(error) {
  return {
    type: UPDATE_ROLE_FAILURE,
    payload: error,
  };
}
function deleteRoleFailure(error) {
  return {
    type: DELETE_ROLE_FAILURE,
    payload: error,
  };
}
function deleteManyRolesFailure(error) {
  return {
    type: DELETE_MANY_ROLES_FAILURE,
    payload: error,
  };
}

export function fetchRoleList(page, limit) {
  return async (dispatch) => {
    dispatch(fetchRoleListStart());
    try {
      const response = await axios.get(
        `/system/role?page${page}&limit=${limit}`
      );
      dispatch(fetchRoleListSuccess(response.data));
    } catch (error) {
      dispatch(fetchRoleListFailure(error.message));
    }
  };
}

export function createRole(roleData) {
  return async (dispatch) => {
    try {
      await axios.post("/user/permission/create-role", roleData);
      dispatch(fetchRoleList());
    } catch (error) {
      console.error(error);
      dispatch(createRoleFailure());
    }
  };
}

export function updateRole(roleId, roleData) {
  return async (dispatch) => {
    try {
      await axios.put(`/user/permission/update-role/${roleId}`, roleData);
      dispatch(fetchRoleList());
      const response = await axios.get("http://localhost:5050/user/me");
      dispatch(loginSuccess(response.data));
    } catch (error) {
      console.error(error);
      dispatch(updateRoleFailure());
    }
  };
}

export function deleteRole(roleId) {
  return async (dispatch) => {
    try {
      await axios.delete(`/user/permission/delete-role/${roleId}`);
      dispatch(fetchRoleList());
    } catch (error) {
      console.error(error);
      dispatch(deleteRoleFailure());
    }
  };
}

export function deleteManyRoles(roles, page, limit) {
  return async function (dispatch) {
    try {
      await axios.post("/user/permission/delete-many-role", { roles });
      dispatch(fetchRoleList(page, limit));
    } catch (error) {
      console.error(error);
      dispatch(deleteManyRolesFailure(error));
    }
  };
}
