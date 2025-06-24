import {
  CREATE_USER_FAILURE,
  DELETE_USER_FAILURE,
  FETCH_USER_LIST_FAILURE,
  FETCH_USER_LIST_START,
  FETCH_USER_LIST_SUCCESS,
  IMPORT_USER_FROM_FILE_FAILURE,
  UPDATE_USER_FAILURE,
} from "../actions/UserManagementAction";

const initialState = {
  loading: false,
  error: null,
  userList: [],
  recordLength: 0,
};

const UserManagementReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_LIST_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_USER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        userList: action.payload.users,
        recordLength: action.payload.totalUsers,
      };
    case FETCH_USER_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case IMPORT_USER_FROM_FILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default UserManagementReducer;
