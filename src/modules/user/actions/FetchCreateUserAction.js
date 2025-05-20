import axios from "../../../masterPage/utils/AxiosInstance";
import { fetchUserList } from "./FetchUserListAction";

export const FETCH_CREATE_USER_START = "FETCH_CREATE_USER_START";
export const FETCH_CREATE_USER_SUCCESS = "FETCH_CREATE_USER_SUCCESS";
export const FETCH_CREATE_USER_FAILURE = "FETCH_CREATE_USER_FAILURE";

function fetchCreateUserStart() {
    return {
        type: FETCH_CREATE_USER_START,
    }
}
function fetchCreateUserSuccess(data) {
    return {
        type: FETCH_CREATE_USER_SUCCESS,
        payload: data,
    }
}
function fetchCreateUserFailure(error) {
    return {
        type: FETCH_CREATE_USER_FAILURE,
        payload: error,
    }
}

export function fetchCreateUser(userData) {
    return async function (dispatch) {
        dispatch(fetchCreateUserStart());
        try {
            const response = await axios.post("/auth/register", userData);
            dispatch(fetchCreateUserSuccess(response.data));
            dispatch(fetchUserList());
        } catch (error) {
            console.error("Error creating user:", error);
            dispatch(fetchCreateUserFailure(error));
        }
    }
} 