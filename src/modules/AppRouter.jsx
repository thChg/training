import React, { Component } from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import EmployeeList from "./employee/pages/EmployeeList";

export class AppRouter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/employee/list" />} />
          <Route path="employee/list" element={<EmployeeList />}></Route>
        </Routes>
      </Router>
    );
  }
}

export default AppRouter;
