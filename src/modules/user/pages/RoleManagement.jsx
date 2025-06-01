import React, { Component } from "react";
import ListTitle from "../../../masterPage/components/ListTitle";
import { RoleManagementContext } from "../components/RoleManagementProvider";
import CreateRoleModal from "../components/CreateRoleModal";
import ListSearchResult from "../../../masterPage/components/ListSearchResult";

export class RoleManagement extends Component {
  static contextType = RoleManagementContext;
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      title,
      onCreate,
      onSearch,
      columns,
      searchResult,
      onSelect,
      permissions,
      menu
    } = this.context;

    return (
      <div>
        <ListTitle
          title={title}
          onCreate={onCreate}
          onSearch={onSearch}
          permissions={permissions}
          menu={menu}
        />
        <ListSearchResult
          columns={columns}
          data={searchResult}
          onSelect={onSelect}
          mapState
        />
        <CreateRoleModal />
      </div>
    );
  }
}

export default RoleManagement;
