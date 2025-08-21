import { getReducerInitialState } from "../../../masterPage/utils/ReducerHelper";
import { model } from "../models/FunctionModel";

const initialState = getReducerInitialState(model);

const FunctionReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default FunctionReducer;
