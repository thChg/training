import axios from "../../../masterPage/utils/AxiosInstance";

export const FETCH_USER_LIST_START = "FETCH_USER_LIST_START";
export const FETCH_USER_LIST_SUCCESS = "FETCH_USER_LIST_SUCCESS";
export const FETCH_USER_LIST_FAILURE = "FETCH_USER_LIST_FAILURE";

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
