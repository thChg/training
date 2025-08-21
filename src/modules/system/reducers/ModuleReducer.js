import { getReducerInitialState } from "../../../masterPage/utils/ReducerHelper";
import { model } from "../models/ModuleModel";

const initialState = getReducerInitialState(model);

const ModuleReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default ModuleReducer;
