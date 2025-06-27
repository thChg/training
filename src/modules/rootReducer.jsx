import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import AuthenticationReducer from "../masterPage/auth/AuthenticationReducer";
import orderReducer from "./sale/reducers/OrderReducer";
import UserManagementReducer from "./user/reducers/UserManagementReducer";
import RoleManagementReducer from "./user/reducers/RoleManagementReducer";
import AccessManagementReducer from "./user/reducers/AccessManagementReducer";
import { RoleInfoReducer } from "./user/reducers/RoleInfoReducer";
import CustomerReducer from "./people/reducers/CustomerReducer";
import VendorReducer from "./people/reducers/VendorReducer";
import EmployeeReducer from "./people/reducers/EmployeeReducer";

const rootReducer = combineReducers({
  AuthenticationReducer,
  orderReducer,
  UserManagementReducer,
  RoleManagementReducer,
  AccessManagementReducer,
  RoleInfoReducer,
  CustomerReducer,
  VendorReducer,
  EmployeeReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
