import React, { Component } from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import EmployeeList from "./employee/pages/EmployeeList";

export class AppRouter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Routes>
          <Route path="employee-list" element={<EmployeeList />}></Route>
        </Routes>
    );
  }
}

export default AppRouter;
