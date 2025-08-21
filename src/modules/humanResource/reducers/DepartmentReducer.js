import { getReducerInitialState } from "../../../masterPage/utils/ReducerHelper";
import { model } from "../models/DepartmentModel";

const initialState = getReducerInitialState(model);

const DepartmentReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default DepartmentReducer;