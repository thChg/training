import { getReducerInitialState } from "../../../masterPage/utils/ReducerHelper";
import { model } from "../models/PositionModel";

const initialState = getReducerInitialState(model);

const PositionReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default PositionReducer;