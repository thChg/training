import axios from "../../../masterPage/utils/AxiosInstance";

export const FETCH_FUNCTION_LIST_START = "FETCH_FUNCTION_LIST_START";
export const FETCH_FUNCTION_LIST_SUCCESS = "FETCH_FUNCTION_LIST_SUCCESS";
export const FETCH_FUNCTION_LIST_FAILURE = "FETCH_FUNCTION_LIST_FAILURE";

function fetchFunctionListStart() {
  return {
    type: FETCH_FUNCTION_LIST_START,
  };
}
function fetchFunctionListSuccess(data) {
  return {
    type: FETCH_FUNCTION_LIST_SUCCESS,
    payload: data,
  };
}
function fetchFunctionListFailure(error) {
  return {
    type: FETCH_FUNCTION_LIST_FAILURE,
    payload: error,
  };
}

export function fetchFunctionList(page, limit) {
  return async function (dispatch) {
    try {
      dispatch(fetchFunctionListStart());
      const response = await axios.get(
        `/system/function?page=${page}&limit=${limit}`
      );
      dispatch(fetchFunctionListSuccess(response.data));
    } catch (error) {
      console.error(error);
      dispatch(fetchFunctionListFailure(error));
    }
  };
}
