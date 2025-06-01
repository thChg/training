import { SELECT_ROLE } from "../actions/RoleInfoAction";

const initialState = {
  selectedRoleId: null,
};
export const RoleInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_ROLE:
      return {
        ...state,
        selectedRoleId: action.payload,
      };
    default:
      return state;
  }
};
