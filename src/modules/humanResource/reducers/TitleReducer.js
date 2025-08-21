import { getReducerInitialState } from "../../../masterPage/utils/ReducerHelper";
import { model } from "../models/TitleModel";

const initialState = getReducerInitialState(model);

const TitleReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default TitleReducer;
