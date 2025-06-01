import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import employeeReducer from "./employee/reducers/EmployeeReducer";
import AuthenticationReducer from "../masterPage/auth/AuthenticationReducer";
import orderReducer from "./sale/reducers/OrderReducer";
import UserManagementReducer from "./user/reducers/UserManagementReducer";
import RoleManagementReducer from "./user/reducers/RoleManagementReducer";
import AccessManagementReducer from "./user/reducers/AccessManagementReducer";
import { RoleInfoReducer } from "./user/reducers/RoleInfoReducer";

const rootReducer = combineReducers({
  employeeReducer,
  AuthenticationReducer,
  orderReducer,
  UserManagementReducer,
  RoleManagementReducer,
  AccessManagementReducer,
  RoleInfoReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
