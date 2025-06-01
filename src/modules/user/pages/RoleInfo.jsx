import React, { Component } from "react";
import { connect } from "react-redux";
import {
  mapDispatchToProps,
  mapStateToProps,
} from "../containers/UserManagementMap";
import { withNavigation } from "../functions/withNavigation";
import { RoleInfoContext } from "../components/RoleInfoProvider";
import FunctionTitle from "../components/FunctionTitle";
import RoleFunctionContent from "../components/RoleFunctionContent";

export class RoleInfo extends Component {
  static contextType = RoleInfoContext;
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      role,
      access,
      permissions,
      isEditing,
      handleEditToggle,
      handleAccessChange,
      handlePermissionsChange,
      handleSave,
      handleDelete,
    } = this.context;
    console.log(permissions);
    const title =
      role.charAt(0).toUpperCase() +
      role.slice(1) +
      "'s access and permissions";
    return (
      <div>
        <FunctionTitle
          title={title}
          isEditing={isEditing}
          onEditToggle={handleEditToggle}
          onSave={handleSave}
          onDelete={handleDelete}
        />
        <RoleFunctionContent
          isEditing={isEditing}
          rolePermissions={permissions}
          roleAccess={access}
          onAccessChange={handleAccessChange}
          onPermissionsChange={handlePermissionsChange}
        />
      </div>
    );
  }
}

const connectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(RoleInfo);
export default withNavigation(connectedComponent);
