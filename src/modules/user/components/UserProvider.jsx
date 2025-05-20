import React, { Component } from "react";
import UserContext from "./UserContext";
import { CreateReloadHanlder } from "../functions/Reload";
import { CreateSetSearchResult } from "../functions/SetSearchResult";
import { CreateSetCreateUserModalVisible } from "../functions/CreateSetCreateUserModalVisible";
import { CreateFetchRoleList } from "../functions/CreateFetchRoleList";
import { CreateSetSelectedUserId } from "../functions/CreateSetSelectedUserId";

export class UserProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reloadKey: 0,
      searchResult: [],
      CreateUserModalVisisble: false,
      roleList: [],
    };

    this.handleReload = CreateReloadHanlder(this);
    this.setSearchResult = CreateSetSearchResult(this);
    this.setCreateUserModalVisible = CreateSetCreateUserModalVisible(this);
    this.fetchRoleList = CreateFetchRoleList(this);
    this.state = {
      ...this.state,
      handleReload: this.handleReload,
      setSearchResult: this.setSearchResult,
      setCreateUserModalVisible: this.setCreateUserModalVisible,
      fetchRoleList: this.fetchRoleList,
    };
  }

  render() {
    return (
      <UserContext.Provider value={this.state}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserProvider;
