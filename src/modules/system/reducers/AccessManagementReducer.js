import { FETCH_ACCESS_LIST_FAILURE, FETCH_ACCESS_LIST_START, FETCH_ACCESS_LIST_SUCCESS } from "../actions/AccessManagementAction";

const initialState = {
    accessList: [],
    loading: false,
    error: null,
};

const AccessManagementReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ACCESS_LIST_START:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_ACCESS_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                accessList: action.payload,
            };
        case FETCH_ACCESS_LIST_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export default AccessManagementReducer;