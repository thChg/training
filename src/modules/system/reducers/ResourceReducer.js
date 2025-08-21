import { getReducerInitialState } from "../../../masterPage/utils/ReducerHelper";
import { model } from "../models/ResourceModel";

const initialState = getReducerInitialState(model);

const ResourceReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default ResourceReducer;
