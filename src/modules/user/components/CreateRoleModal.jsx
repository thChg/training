import React, { Component } from "react";
import classes from "../../../css/modules/components/CreateRoleModal.module.css";
import { connect } from "react-redux";
import {
  mapDispatchToProps,
  mapStateToProps,
} from "../containers/UserManagementMap";
import { RoleManagementContext } from "./RoleManagementProvider";

export class CreateRoleModal extends Component {
  static contextType = RoleManagementContext;

  constructor(props) {
    super(props);
    this.state = {
      role: "",
    };
    this.setRole = this.setRole.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.accessList.length <= 0) {
      this.props.fetchAccessList();
    }
  }

  setRole(event) {
    this.setState({ role: event.target.value });
  }

  async handleSubmit() {
    const { role } = this.state;
    const { onCreateFinish } = this.context;

    if (!role) {
      alert("Please enter a role name.");
      return;
    }

    const roleData = {
      role,
    };
    await this.props.createRole(roleData);
    this.setState({
      role: "",
    });
    onCreateFinish();
  }

  render() {
    const { createModalVisible, onCreateFinish } = this.context;

    if (!createModalVisible) {
      return null;
    }

    return (
      <div className={classes.modalBackdrop}>
        <div className={classes.modal}>
          <h2>Create New Role</h2>
          <label>
            Role Name:
            <input
              type="text"
              value={this.state.role}
              onChange={this.setRole}
            />
          </label>

          <div className={classes.modalButtons}>
            <button onClick={onCreateFinish} className={classes.cancelBtn}>
              Cancel
            </button>
            <button onClick={this.handleSubmit} className={classes.createBtn}>
              Create
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRoleModal);
