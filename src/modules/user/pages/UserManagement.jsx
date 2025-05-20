import React, { Component } from "react";
import UserProvider from "../components/UserProvider";
import ListTitle from "../components/ListTitle";
import {
  mapDispatchToProps,
  mapStateToProps,
} from "../containers/UserManagementMap";
import { connect } from "react-redux";
import ListSearchResult from "../components/ListSearchResult";
import CreateUserModal from "../components/CreateUserModal";
import UserInfoModal from "../components/UserInfoModal";

export class UserManagement extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    
    return (
      <UserProvider>
        <ListTitle title="User Management" />
        <ListSearchResult />
        <CreateUserModal />
        {/* {this.props.selectedUserId && <UserInfoModal />} */}
      </UserProvider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserManagement);
