import React, { Component } from "react";
import EmployeeContext from "./EmployeeContext";
import { CreateReloadHanlder } from "../functions/Reload";
import { CreateComputeFilterCount } from "../functions/ComputeFilterCount";
import { CreateSetCurrentFilter } from "../functions/SetCurrentFilter";

export class EmployeeProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reloadKey: 0,
      filterCount: {},
      currentFilter: "All",
    };

    this.handleReload = CreateReloadHanlder(this);
    this.computeFilterCount = CreateComputeFilterCount(this);
    this.setCurrentFilter = CreateSetCurrentFilter(this);

    this.state = {
      ...this.state,
      handleReload: this.handleReload,
      computeFilterCount: this.computeFilterCount,
      setCurrentFilter: this.setCurrentFilter,
    };
  }

  render() {
    return (
      <EmployeeContext.Provider value={this.state}>
        {this.props.children}
      </EmployeeContext.Provider>
    );
  }
}

export default EmployeeProvider;
