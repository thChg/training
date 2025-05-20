import React, { Component } from "react";
import ListTitle from "../components/ListTitle";
import EmployeeProvider from "../components/EmployeeProvider";
import ListActionList from "../components/ListActionList";
import ListSearchResult from "../components/ListSearchResult";
import axios from "../../../masterPage/utils/AxiosInstance";
export class EmployeeList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <EmployeeProvider>
        <ListTitle title="Emloyee List" />

        <ListActionList />

        <ListSearchResult />
      </EmployeeProvider>
    );
  }
}

export default EmployeeList;
