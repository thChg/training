import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import employeeReducer from "./employee/reducers/EmployeeReducer";
import AuthenticationReducer from "../masterPage/auth/AuthenticationReducer";

const rootReducer = combineReducers({
  employeeReducer,
  AuthenticationReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
