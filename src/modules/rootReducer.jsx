import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import employeeReducer from "./employee/reducers/EmployeeReducer";

const rootReducer = combineReducers({
  employeeReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
