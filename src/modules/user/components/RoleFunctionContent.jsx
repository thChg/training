import React, { Component } from "react";
import classes from "../../../css/modules/components/RoleFunctionContent.module.css";
import { connect } from "react-redux";
import {
  mapDispatchToProps,
  mapStateToProps,
} from "../containers/UserManagementMap";
import { isEqual } from "lodash";

const PERMISSIONS = ["view", "create", "edit", "delete", "print"];

export class RoleFunctionContent extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleAccessChange = this.handleAccessChange.bind(this, this);
    this.handlePermissionsChange = this.handlePermissionsChange.bind(
      this,
      this
    );
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
        <table>
          <thead>
            <tr>
              <th>Page</th>
              <th>Access</th>
              <th>View</th>
              <th>Create</th>
              <th>Edit</th>
              <th>Delete</th>
              <th>Print</th>
            </tr>
          </thead>
          <tbody>
            {accessList.map((page) => {
              return (
                <tr key={page._id}>
                  <td>{page.menu}</td>
                  <td className={classes.checkbox}>
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
                      <td className={classes.checkbox}>
                        <input
                          type="checkbox"
                          value={value}
                          disabled={!isEditing || !roleAccess.includes(page._id)}
                          checked={rolePermissions.includes(value)}
                          onChange={this.handlePermissionsChange}
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
