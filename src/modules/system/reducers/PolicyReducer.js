import { getReducerInitialState } from "../../../masterPage/utils/ReducerHelper";
import { model } from "../models/PolicyModel";

const initialState = getReducerInitialState(model);

const PolicyReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default PolicyReducer;
