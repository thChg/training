import { getReducerInitialState } from "../../../masterPage/utils/ReducerHelper";
import { model } from "../models/EmployeeModel";

const initialState = getReducerInitialState(model);

const EmployeeReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default EmployeeReducer;
