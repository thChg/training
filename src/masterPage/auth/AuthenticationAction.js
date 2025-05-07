export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";


export function loginRequest() {
    return {
        type: LOGIN_REQUEST,
    };
    }
export function loginSuccess(user) {
    return {
        type: LOGIN_SUCCESS,
        payload: user,
    };
}
export function loginFailure(error) {
    return {
        type: LOGIN_FAILURE,
        payload: error,
    };
}

export function logout() {
    return {
        type: LOGOUT,
    };
}
