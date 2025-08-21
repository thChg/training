import { getReducerInitialState } from "../../../masterPage/utils/ReducerHelper";
import { model } from "../models/AccessModel";

const initialState = getReducerInitialState(model);

const AccessReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default AccessReducer;
