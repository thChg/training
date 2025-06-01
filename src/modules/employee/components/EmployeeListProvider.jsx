import React, { Component } from "react";
import { CreateReloadHanlder } from "../functions/Reload";
import { CreateComputeFilterCount } from "../functions/ComputeFilterCount";
import { CreateSetSearchResult } from "../functions/SetSearchResult";
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "../containers/EmployeeMap";
import moment from "moment";

export const EmployeeListContext = React.createContext();

export class EmployeeListProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "Employee List",
      menu: "employee",
      columns: [
        "name",
        "email",
        "department",
        "isActive",
        "isRemote",
        "isManager",
        "hasOnboarded",
        "isFulltime",
        "createdAt",
      ],
      filterCount: {},
      searchResult: [],
      loading: this.props.loading || false,
      permissions: this.props.permissions || [],
    };

    this.handleReload = CreateReloadHanlder(this);
    this.computeFilterCount = CreateComputeFilterCount(this);
    this.setSearchResult = CreateSetSearchResult(this);

    this.state = {
      ...this.state,
      computeFilterCount: this.computeFilterCount,
      handleCurrentFilter: this.handleCurrentFilter,
    };

    this.handleCurrentFilter = this.handleCurrentFilter.bind(this);
  }

  handleCurrentFilter(filter) {
    let trimFilter = filter.trim();
    const result =
      trimFilter === "All"
        ? this.props.employeeList
        : this.props.employeeList.filter((element) => element[trimFilter]);
    this.setState({
      searchResult: result.map((element) => ({
        name: element.name,
        email: element.email,
        department: element.department,
        isActive: element.isActive ? "Yes" : "No",
        isRemote: element.isRemote ? "Yes" : "No",
        isManager: element.isManager ? "Yes" : "No",
        hasOnboarded: element.hasOnboarded ? "Yes" : "No",
        isFulltime: element.isFulltime ? "Yes" : "No",
        createdAt: moment(element.createdAt).format("YYYY-MM-DD HH:mm"),
      })),
    });
    this.handleReload();
  }

  componentDidMount() {
    if (this.props.employeeList.length <= 0) {
      this.props.fetchEmployeeList();
    }
    this.setState({
      searchResult: this.props.employeeList.map((element) => ({
        name: element.name,
        email: element.email,
        department: element.department,
        isActive: element.isActive ? "Yes" : "No",
        isRemote: element.isRemote ? "Yes" : "No",
        isManager: element.isManager ? "Yes" : "No",
        hasOnboarded: element.hasOnboarded ? "Yes" : "No",
        isFulltime: element.isFulltime ? "Yes" : "No",
        createdAt: moment(element.createdAt).format("YYYY-MM-DD HH:mm"),
      })),
    });
  }

  render() {
    return (
      <EmployeeListContext.Provider
        value={{ ...this.state, handleCurrentFilter: this.handleCurrentFilter }}
      >
        {this.props.children}
      </EmployeeListContext.Provider>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeListProvider);
