import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import AuthenticationReducer from "../masterPage/auth/AuthenticationReducer";
import orderReducer from "./sale/reducers/OrderReducer";
import UserManagementReducer from "./user/reducers/UserManagementReducer";
import RoleManagementReducer from "./user/reducers/RoleManagementReducer";
import AccessManagementReducer from "./user/reducers/AccessManagementReducer";
import { RoleInfoReducer } from "./user/reducers/RoleInfoReducer";
import InventoryReducer from "./product/reducers/InventoryReducer";
import PurchaseOrderReducer from "./product/reducers/PurchaseOrderReducer";
import POApproveReducer from "./accounting/reducers/POApproveReducer";
import AccountantReducer from "./employee/reducers/AccountantReducer";
import BillOfLadingReducer from "./product/reducers/BillOfLadingReducer";

const rootReducer = combineReducers({
  AuthenticationReducer,
  orderReducer,
  UserManagementReducer,
  RoleManagementReducer,
  AccessManagementReducer,
  RoleInfoReducer,
  InventoryReducer,
  PurchaseOrderReducer,
  POApproveReducer,
  AccountantReducer,
  BillOfLadingReducer
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
