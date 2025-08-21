import { getReducerInitialState } from "../../../masterPage/utils/ReducerHelper";
import { model } from "../models/UserModel";

const initialState = getReducerInitialState(model);

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default UserReducer;
