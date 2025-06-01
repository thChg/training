import React, { Component } from "react";
import ListActionList from "../components/ListActionList";
import ListSearchResult from "../../../masterPage/components/ListSearchResult";
import ListTitle from "../../../masterPage/components/ListTitle";
import { EmployeeListContext } from "../components/EmployeeListProvider";
export class EmployeeList extends Component {
  static contextType = EmployeeListContext;
  constructor(props) {
    super(props);
  }

  render() {
    const { title, menu, permissions, searchResult, columns, loading } =
      this.context;
    return (
      <>
        <ListTitle title={title} menu={menu} permissions={permissions} />
        <ListActionList data={searchResult} />
        <ListSearchResult
          columns={columns}
          data={searchResult}
          loading={loading}
        />
      </>
    );
  }
}

export default EmployeeList;
