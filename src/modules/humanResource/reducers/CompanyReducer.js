import { getReducerInitialState } from "../../../masterPage/utils/ReducerHelper";
import { model } from "../models/CompanyModel";

const initialState = getReducerInitialState(model);

const CompanyReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default CompanyReducer;