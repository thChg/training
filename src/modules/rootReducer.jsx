import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import employeeReducer from "./employee/reducers/EmployeeReducer";
import AuthenticationReducer from "../masterPage/auth/AuthenticationReducer";
import orderReducer from "./sale/reducers/OrderReducer";
import UserManagementReducer from "./user/reducers/UserManagementReducer";

const rootReducer = combineReducers({
  employeeReducer,
  AuthenticationReducer,
  orderReducer,
  UserManagementReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
