import axios from "../../../masterPage/utils/AxiosInstance";

export const FETCH_USER_LIST_START = "FETCH_USER_LIST_START";
export const FETCH_USER_LIST_SUCCESS = "FETCH_USER_LIST_SUCCESS";
export const FETCH_USER_LIST_FAILURE = "FETCH_USER_LIST_FAILURE";
export const DELETE_USER = "DELETE_USER";
export const UPDATE_USER = "UPDATE_USER";

function fetchUserListStart() {
  return {
    type: FETCH_USER_LIST_START,
  };
}

function fetchUserListSuccess(data) {
  return {
    type: FETCH_USER_LIST_SUCCESS,
    payload: data,
  };
}
function fetchUserListFailure(error) {
  return {
    type: FETCH_USER_LIST_FAILURE,
    payload: error,
  };
}

export function fetchUserList() {
  return async function (dispatch) {
    dispatch(fetchUserListStart());
    try {
      const response = await axios.get("/user/list");
      dispatch(fetchUserListSuccess(response.data));
    } catch (error) {
      console.error("Error fetching user list:", error);
      dispatch(fetchUserListFailure(error));
    }
  };
}

export function createUser(userData) {
  return async function (dispatch) {
    try {
      await axios.post("/auth/register", userData);
      dispatch(fetchUserList());
    } catch (error) {
      console.error("Error creating user:", error);
      // You can optionally show a toast or alert here instead of dispatching an error action
    }
  };
}

export function updateUser(userId, userData) {
  return async function (dispatch) {
    try {
      await axios.put(`/user/update/${userId}`, userData);
      dispatch(fetchUserList());
    } catch (error) {
      console.error("Error updating user:", error);
    }
  }
}

export function deleteUser(userId) {
  return async function (dispatch) {
    try {
      await axios.delete(`/user/delete/${userId}`);
      dispatch(fetchUserList());
    } catch (error) {
      console.error("Error deleting user:", error);
      // You can optionally show a toast or alert here instead of dispatching an error action
    }
  }
}

