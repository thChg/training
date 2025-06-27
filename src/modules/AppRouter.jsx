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
          path="customers"
          element={
            <CustomerProvider>
              <Customer />
            </CustomerProvider>
          }
        />
        <Route
          path="vendors"
          element={
            <VendorProvider>
              <Vendor />
            </VendorProvider>
          }
        />
        <Route
          path="employees"
          element={
            <EmployeeProvider>
              <Employee />
            </EmployeeProvider>
          }
        />
      </Routes>
    );
  }
}

export default AppRouter;
