import React, { Component } from "react";
import classes from "../../../css/modules/components/RoleFunctionContent.module.css";
import { connect } from "react-redux";
import {
  mapDispatchToProps,
  mapStateToProps,
} from "../containers/UserManagementMap";

const PERMISSIONS = [
  "view",
  "create",
  "update",
  "delete",
  "print",
  "export",
  "resolve",
];

export class RoleFunctionContent extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleAccessChange = this.handleAccessChange.bind(this, this);
    this.handlePermissionsChange = this.handlePermissionsChange.bind(
      this,
      this
    );
    this.renderHeader = this.renderHeader.bind(this);
  }

  renderHeader() {
    return PERMISSIONS.map((permission) => (
      <th>{permission.charAt(0).toUpperCase() + permission.slice(1)}</th>
    ));
  }

  handleAccessChange(self, event) {
    this.props.onAccessChange(event);
  }

  handlePermissionsChange(self, event) {
    this.props.onPermissionsChange(event);
  }

  render() {
    const { accessList, isEditing, roleAccess, rolePermissions } = this.props;
    return (
      <div className={classes.accessAndPermissions}>
        <table className={classes.table}>
          <thead>
            <th>Page</th>
            <th>Access</th>
            {this.renderHeader()}
          </thead>
          <tbody>
            {accessList.map((page) => {
              return (
                <tr key={page._id}>
                  <td>{page.menu}</td>
                  <td className={classes.checkboxContainer}>
                    <input
                      type="checkbox"
                      value={page._id}
                      disabled={!isEditing}
                      checked={roleAccess.includes(page._id)}
                      onChange={this.handleAccessChange}
                    />
                  </td>
                  {PERMISSIONS.map((permission) => {
                    const value = `[${page.menu}:${permission}]`.toLowerCase();
                    return (
                      <td className={classes.checkboxContainer}>
                        <input
                          type="checkbox"
                          value={value}
                          disabled={
                            !isEditing || !roleAccess.includes(page._id)
                          }
                          checked={rolePermissions.includes(value)}
                          onChange={this.handlePermissionsChange}
                          className={classes.checkbox}
                        />
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoleFunctionContent);
