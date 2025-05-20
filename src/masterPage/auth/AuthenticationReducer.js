import axios from "../../masterPage/utils/AxiosInstance";
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  loginFailure,
  loginRequest,
  loginSuccess,
  logout,
  LOGOUT,
} from "./AuthenticationAction";

const initialState = {
  loading: false,
  user: null,
  error: null,
};

export default function AuthenticationReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

export function handleLogin(user) {
  return async (dispatch) => {
    dispatch(loginRequest());
    try {
      await axios.post("http://localhost:5050/auth/login", user);
      const response = await axios.get("http://localhost:5050/user/me");
      dispatch(loginSuccess(response.data));
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };
}

export function fetchUser() {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:5050/user/me");
      dispatch(loginSuccess(response.data));
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };
}

export function handleLogout() {
  return async (dispatch) => {
    try {
      await axios.post("http://localhost:5050/auth/logout");
      dispatch(logout());
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
}
