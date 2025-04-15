import React, { Component } from "react";
import EmployeeContext from "./EmployeeContext";
import { CreateReloadHanlder } from "../functions/Reload";
import { CreateComputeFilterCount } from "../functions/ComputeFilterCount";
import { CreateSetSearchResult } from "../functions/SetSearchResult";
import { CreateHandleCurrentFilter } from "../functions/HandleCurrentFilter";

export class EmployeeProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reloadKey: 0,
      filterCount: {},
      searchResult: [],
    };

    this.handleReload = CreateReloadHanlder(this);
    this.computeFilterCount = CreateComputeFilterCount(this);
    this.setSearchResult = CreateSetSearchResult(this);
    this.handleCurrentFilter = CreateHandleCurrentFilter(this);

    this.state = {
      ...this.state,
      handleReload: this.handleReload,
      computeFilterCount: this.computeFilterCount,
      setSearchResult: this.setSearchResult,
      handleCurrentFilter: this.handleCurrentFilter,
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
