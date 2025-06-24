import {
  CREATE_ROLE_FAILURE,
  DELETE_MANY_ROLES_FAILURE,
  DELETE_ROLE_FAILURE,
  FETCH_ROLE_LIST_FAILURE,
  FETCH_ROLE_LIST_START,
  FETCH_ROLE_LIST_SUCCESS,
  UPDATE_ROLE_FAILURE,
} from "../actions/RoleManagementAction";

const initialState = {
  loading: false,
  error: null,
  roleList: [],
  recordLength: 0,
};

const RoleManagementReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ROLE_LIST_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_ROLE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        roleList: action.payload.roleList,
        recordLength: action.payload.totalRoles,
      };
    case FETCH_ROLE_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_ROLE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_ROLE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_ROLE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_MANY_ROLES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default RoleManagementReducer;