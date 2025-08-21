import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import AuthenticationReducer from "../masterPage/auth/AuthenticationReducer";
import UserReducer from "./system/reducers/UserReducer";
import RoleReducer from "./system/reducers/RoleReducer";
import AccessManagementReducer from "./system/reducers/AccessManagementReducer";
import { RoleInfoReducer } from "./system/reducers/RoleInfoReducer";
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
import FunctionReducer from "./system/reducers/FunctionReducer";
import ModuleReducer from "./system/reducers/ModuleReducer";
import PositionReducer from "./humanResource/reducers/PositionReducer";
import DepartmentReducer from "./humanResource/reducers/DepartmentReducer";
import TitleReducer from "./humanResource/reducers/TitleReducer";
import CompanyReducer from "./humanResource/reducers/CompanyReducer";
import EmployeeReducer from "./humanResource/reducers/EmployeeReducer";
import ResourceReducer from "./system/reducers/ResourceReducer";
import PolicyReducer from "./system/reducers/PolicyReducer";
import AccessReducer from "./system/reducers/AccessReducer";

const rootReducer = combineReducers({
  AuthenticationReducer,
  UserReducer,
  RoleReducer,
  FunctionReducer,
  ModuleReducer,
  ResourceReducer,
  PolicyReducer,
  AccessReducer,

  PositionReducer,
  DepartmentReducer,
  TitleReducer,
  CompanyReducer,
  EmployeeReducer,

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
