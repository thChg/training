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

export class AppRouter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Routes>
        <Route path="employee-list" element={<EmployeeList />} />
        <Route path="orders" element={<Order />} />
        <Route path="user-management" element={<UserManagement />} />
      </Routes>
    );
  }
}

export default AppRouter;
