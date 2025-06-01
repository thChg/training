import axios from "../../../masterPage/utils/AxiosInstance";

export const FETCH_ROLE_LIST_START = "FETCH_ROLE_LIST_START";
export const FETCH_ROLE_LIST_SUCCESS = "FETCH_ROLE_LIST_SUCCESS";
export const FETCH_ROLE_LIST_FAILURE = "FETCH_ROLE_LIST_FAILURE";

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

export function fetchRoleList() {
  return async (dispatch) => {
    dispatch(fetchRoleListStart());
    try {
      const response = await axios.get("/user/permission/role-list");
      const data = response.data;
      dispatch(fetchRoleListSuccess(data));
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
      throw new Error(error.message);
    }
  };
}

export function updateRole(roleId, roleData) {
  return async (dispatch) => {
    try {
      await axios.put(`/user/permission/update-role/${roleId}`, roleData);
      dispatch(fetchRoleList());
    } catch (error) {
      throw new Error(error.message);
    }
  };
}

export function deleteRole(roleId) {
  return async (dispatch) => {
    try {
      await axios.delete(`/user/permission/delete-role/${roleId}`);
      dispatch(fetchRoleList());
    } catch (error) {
      throw new Error(error.message);
    }
  };
}