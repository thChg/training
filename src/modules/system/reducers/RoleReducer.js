import { getReducerInitialState } from "../../../masterPage/utils/ReducerHelper";
import { model } from "../models/RoleModel";

const initialState = getReducerInitialState(model);

const RoleReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default RoleReducer;
