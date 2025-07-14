import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import AuthenticationReducer from "../masterPage/auth/AuthenticationReducer";
import UserManagementReducer from "./user/reducers/UserManagementReducer";
import RoleManagementReducer from "./user/reducers/RoleManagementReducer";
import AccessManagementReducer from "./user/reducers/AccessManagementReducer";
import { RoleInfoReducer } from "./user/reducers/RoleInfoReducer";
import InventoryReducer from "./product/reducers/InventoryReducer";
import PurchaseOrderReducer from "./product/reducers/PurchaseOrderReducer";
import POApproveReducer from "./accounting/reducers/POApproveReducer";
import AccountantReducer from "./employee/reducers/AccountantReducer";
import BillOfLadingReducer from "./product/reducers/BillOfLadingReducer";
import ProductReducer from "./product/reducers/ProductReducer";
import SaleOrderReducer from "./sales/reducers/SaleOrderReducer";
import CustomerReducer from "./community/reducers/CustomerReducer";
import VendorReducer from "./community/reducers/VendorReducer";
import DeliveryNoteReducer from "./warehouse/reducers/DeliveryNoteReducer";
import FiscalPeriodReducer from "./accounting/reducers/FiscalPeriodReducer";
import InventorySummaryReducer from "./reports/reducers/InventorySummaryReducer";

const rootReducer = combineReducers({
  AuthenticationReducer,
  UserManagementReducer,
  RoleManagementReducer,
  AccessManagementReducer,
  RoleInfoReducer,
  InventoryReducer,
  PurchaseOrderReducer,
  POApproveReducer,
  AccountantReducer,
  BillOfLadingReducer,
  ProductReducer,
  SaleOrderReducer,
  CustomerReducer,
  VendorReducer,
  DeliveryNoteReducer,
  FiscalPeriodReducer,
  InventorySummaryReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
