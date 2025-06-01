import axios from "../../../masterPage/utils/AxiosInstance";

export const FETCH_ACCESS_LIST_FAILURE = "FETCH_ACCESS_LIST_FAILURE";
export const FETCH_ACCESS_LIST_START = "FETCH_ACCESS_LIST_START";
export const FETCH_ACCESS_LIST_SUCCESS = "FETCH_ACCESS_LIST_SUCCESS";

function fetchAccessListStart() {
  return {
    type: FETCH_ACCESS_LIST_START,
  };
}
function fetchAccessListSuccess(accessList) {
  return {
    type: FETCH_ACCESS_LIST_SUCCESS,
    payload: accessList,
  };
}
function fetchAccessListFailure(error) {
  return {
    type: FETCH_ACCESS_LIST_FAILURE,
    payload: error,
  };
}
export function fetchAccessList() {
  return async (dispatch) => {
    dispatch(fetchAccessListStart());
    try {
      const response = await axios.get("/user/permission/access-list");
      const data = response.data;
      dispatch(fetchAccessListSuccess(data));
    } catch (error) {
      dispatch(fetchAccessListFailure(error.message));
    }
  };
}
