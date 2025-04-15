import React, { Component } from "react";
import classes from "../../../css/modules/components/ListSearchResult.module.css";
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "../containers/EmployeeMap";
import EmployeeContext from "./EmployeeContext";
export class ListSearchResult extends Component {
  static contextType = EmployeeContext
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.fetchEmployee();
    this.context.setSearchResult(this.props.employees);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.employees !== this.props.employees) {
      this.context.setSearchResult(this.props.employees);
    }
  }

  render() {
    if (this.props.loading) {
      return <div>Loading...</div>;
    }
    if (this.props.error) {
      return <div>Error: {this.props.error}</div>;
    }
    return (
      <table className={classes.container}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Email</th>
            <th>isActive</th>
            <th>isRemote</th>
            <th>isManager</th>
            <th>hasOnboarded</th>
            <th>isFulltime</th>
          </tr>
        </thead>
        <tbody>
          {this.context.searchResult.map((employee) => (
            <tr key={employee.id}>
              <td>{employee._id}</td>
              <td>{employee.name}</td>
              <td>{employee.department}</td>
              <td>{employee.email}</td>
              <td>{employee.isActive ? "true" : "false"}</td>
              <td>{employee.isRemote ? "true" : "false"}</td>
              <td>{employee.isManager ? "true" : "false"}</td>
              <td>{employee.hasOnboarded ? "true" : "false"}</td>
              <td>{employee.isFulltime ? "true" : "false"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListSearchResult);
