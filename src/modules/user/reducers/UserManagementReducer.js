import {
  FETCH_USER_LIST_FAILURE,
  FETCH_USER_LIST_START,
  FETCH_USER_LIST_SUCCESS,
} from "../actions/FetchUserListAction";
import {
  SET_SELECTED_USER_ID,
} from "../actions/SelectedUserIdAction";

const initialState = {
  loading: false,
  error: null,
  userList: [],
  selectedUserId: null,
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
        userList: action.payload,
      };
    case FETCH_USER_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SET_SELECTED_USER_ID:
      return {
        ...state,
        selectedUserId: action.payload,
      };
    default:
      return state;
  }
};

export default UserManagementReducer;
