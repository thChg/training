import React, { Component } from "react";
import { connect } from "react-redux";
import {
  mapDispatchToProps,
  mapStateToProps,
} from "../containers/RoleManagementMap";
import { withNavigation } from "../functions/withNavigation";

export const RoleInfoContext = React.createContext();

export class RoleInfoProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      role: "",
      access: [],
      permissions: [],
      isEditing: false,
      accessList: props.accessList,
    };

    this.handleEditToggle = this.handleEditToggle.bind(this, this);
    this.handleSave = this.handleSave.bind(this, this);
    this.handleDelete = this.handleDelete.bind(this, this);
    this.handleAccessChange = this.handleAccessChange.bind(this, this);
    this.handlePermissionsChange = this.handlePermissionsChange.bind(
      this,
      this
    );
  }

  handleEditToggle(self) {
    this.setState((prevState) => ({
      isEditing: !prevState.isEditing,
    }));
  }

  handleSave(self) {
    const { access, permissions } = self.state;
    const roleID = self.props.selectedRoleId;
    const updatedRole = {
      access: access.map((acc) => ({ _id: acc })),
      permissions: permissions,
    };
    this.props.updateRole(roleID, updatedRole);

    this.handleEditToggle(self);
  }

  handleDelete() {
    this.setState({
      role: "",
      access: [],
      permissions: [],
      isEditing: false,
    });
    this.props.deleteRole(this.props.selectedRoleId);
    this.props.navigate("/role-management");
  }

  handleAccessChange(self, event) {
    const { access, permissions } = self.state;
    const value = event.target.value;
    const menu = self.props.accessList
      .find((page) => page._id === value)
      .menu.toLowerCase();

    if (access.includes(value)) {
      self.setState({
        access: access.filter((acc) => acc !== value),
        permissions: self.state.permissions.filter(
          (perm) => !perm.startsWith(`[${menu}:`)
        ),
      });
    } else {
      self.setState({
        access: [...access, value],
        permissions: [...permissions, `[${menu}:view]`],
      });
    }
  }

  handlePermissionsChange(self, event) {
    const { permissions } = self.state;
    const value = event.target.value;

    if (permissions.includes(value)) {
      self.setState({
        permissions: permissions.filter((perm) => perm !== value),
      });
    } else {
      self.setState({
        permissions: [...permissions, value],
      });
    }
  }

  async componentDidMount() {
    const { selectedRoleId, roleList } = this.props;
    const role = roleList.find((role) => role._id === selectedRoleId);
    this.setState({
      role: role ? role.role : "",
      access: role ? role.access.map((acc) => acc._id) : [],
      permissions: role ? role.permissions : [],
    });
  }

  render() {
    return (
      <RoleInfoContext.Provider
        value={{
          ...this.state,
          handleEditToggle: this.handleEditToggle,
          handleAccessChange: this.handleAccessChange,
          handlePermissionsChange: this.handlePermissionsChange,
          handleSave: this.handleSave,
          handleDelete: this.handleDelete,
        }}
      >
        {this.props.children}
      </RoleInfoContext.Provider>
    );
  }
}

const connectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(RoleInfoProvider);
export default withNavigation(connectedComponent);
