import React, { Component } from "react";

import CreateUserModal from "../components/CreateUserModal";
import UserInfoModal from "../components/UserInfoModal";
import { UserManagementContext } from "../components/UserManagementProvider";
import ListTitle from "../../../masterPage/components/ListTitle";
import ListSearchResult from "../../../masterPage/components/ListSearchResult";

export class UserManagement extends Component {
  static contextType = UserManagementContext;
  constructor(props) {
    super(props);
  }

  render() {
    const {
      onCreate,
      title,
      selectedUserId,
      setSelectedUserId,
      searchResult,
      onSearch,
      columns,
      loading,
      permissions,
      menu
    } = this.context;
    return (
      <div>
        <ListTitle title={title} onCreate={onCreate} onSearch={onSearch} permissions={permissions} menu={menu}/>

        <ListSearchResult
          columns={columns}
          data={searchResult}
          onSelect={setSelectedUserId}
          loading={loading}
        />
        <CreateUserModal />
        {selectedUserId && <UserInfoModal />}
      </div>
    );
  }
}

export default UserManagement;
