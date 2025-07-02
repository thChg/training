import React, { Component } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Order from "./sale/pages/Order";
import UserManagement from "./user/pages/UserManagement";
import RoleManagement from "./user/pages/RoleManagement";
import UserManagementProvider from "./user/components/UserManagementProvider";
import RoleManagementProvider from "./user/components/RoleManagementProvider";
import RoleInfo from "./user/pages/RoleInfo";
import RoleInfoProvider from "./user/components/RoleInfoProvider";
import CustomerProvider from "./people/components/CustomerProvider";
import Customer from "./people/pages/Customer";
import VendorProvider from "./people/components/VendorProvider";
import Vendor from "./people/pages/Vendor";
import EmployeeProvider from "./people/components/EmployeeProvider";
import Employee from "./people/pages/Employee";
import PurchaseOrder from "./product/pages/PurchaseOrder";
import InventoryProvider from "./product/components/InventoryProvider";
import Inventory from "./product/pages/Inventory";
import PurchaseOrderProvider from "./product/components/PurchaseOrderProvider";
import BillOfLadingProvider from "./product/components/BillOfLadingProvider";
import BillOfLading from "./product/pages/BillOfLading";
import POAppoveProvider from "./accounting/components/POAppoveProvider";
import POApprove from "./accounting/pages/POApprove";
import POAppoveDetailProvider from "./accounting/components/POAppoveDetailProvider";
import POApproveDetail from "./accounting/pages/POApproveDetail";
import AccountantProvider from "./employee/components/AccountantProvider";
import Accountant from "./employee/pages/Accountant";
import BOLDetailProvider from "./product/components/BOLDetailProvider";
import BOLDetail from "./product/pages/BillOfLadingDetail";
import PODetailProvider from "./product/components/PODetailProvider";
import PODetail from "./product/pages/PurchaseOrderDetail";

export class AppRouter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Routes>
        <Route path="orders" element={<Order />} />
        <Route
          path="user-management"
          element={
            <UserManagementProvider>
              <UserManagement />
            </UserManagementProvider>
          }
        />
        <Route
          path="role-management"
          element={
            <RoleManagementProvider>
              <RoleManagement />
            </RoleManagementProvider>
          }
        />
        <Route
          path="role-management/detail"
          element={
            <RoleInfoProvider>
              <RoleInfo />
            </RoleInfoProvider>
          }
        />
        <Route
          path="inventory"
          element={
            <InventoryProvider>
              <Inventory />
            </InventoryProvider>
          }
        />
        <Route
          path="purchase-orders"
          element={
            <PurchaseOrderProvider>
              <PurchaseOrder />
            </PurchaseOrderProvider>
          }
        />
        <Route
          path="purchase-orders/details/:id"
          element={
            <PODetailProvider>
              <PODetail />
            </PODetailProvider>
          }
        />
        <Route
          path="bill-of-ladings"
          element={
            <BillOfLadingProvider>
              <BillOfLading />
            </BillOfLadingProvider>
          }
        />
        <Route
          path="bill-of-ladings/details/:id"
          element={
            <BOLDetailProvider>
              <BOLDetail />
            </BOLDetailProvider>
          }
        />
        <Route
          path="po-approve"
          element={
            <POAppoveProvider>
              <POApprove />
            </POAppoveProvider>
          }
        />
        <Route
          path="po-approve/details/:id"
          element={
            <POAppoveDetailProvider>
              <POApproveDetail />
            </POAppoveDetailProvider>
          }
        />
        <Route
          path="accountant"
          element={
            <AccountantProvider>
              <Accountant />
            </AccountantProvider>
          }
        />
        {/* <Route
          path="inventory-manager"
          element={
            <POAppoveDetailProvider>
              <POApproveDetail />
            </POAppoveDetailProvider>
          }
        /> */}
      </Routes>
    );
  }
}

export default AppRouter;
