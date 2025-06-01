import { FETCH_ROLE_LIST_FAILURE, FETCH_ROLE_LIST_START, FETCH_ROLE_LIST_SUCCESS } from "../actions/RoleManagementAction";

const initialState = {
    loading: false,
    error: null,
    roleList: [],
}
 
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
                roleList: action.payload,
            };
        case FETCH_ROLE_LIST_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export default RoleManagementReducer;