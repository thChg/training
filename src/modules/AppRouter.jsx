import React, { Component } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import EmployeeList from "./employee/pages/EmployeeList";
import Order from "./sale/pages/Order";
import UserManagement from "./user/pages/UserManagement";
import RoleManagement from "./user/pages/RoleManagement";
import UserManagementProvider from "./user/components/UserManagementProvider";
import RoleManagementProvider from "./user/components/RoleManagementProvider";
import RoleInfo from "./user/pages/RoleInfo";
import RoleInfoProvider from "./user/components/RoleInfoProvider";
import EmployeeListProvider from "./employee/components/EmployeeListProvider";
import CustomerProvider from "./people/components/CustomerProvider";
import Customer from "./people/pages/Customer";

export class AppRouter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Routes>
        <Route
          path="employee-list"
          element={
            <EmployeeListProvider>
              <EmployeeList />
            </EmployeeListProvider>
          }
        />
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
      </Routes>
    );
  }
}

export default AppRouter;
