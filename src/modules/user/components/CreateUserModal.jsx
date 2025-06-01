import React, { Component } from "react";
import classes from "../../../css/modules/components/CreateUserModal.module.css";
import { UserManagementContext } from "./UserManagementProvider";
import { connect } from "react-redux";
import {
  mapDispatchToProps,
  mapStateToProps,
} from "../containers/UserManagementMap";

export class CreateUserModal extends Component {
  static contextType = UserManagementContext;
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      role: "",
      apartment: "",
    };
    this.setUsername = this.setUsername.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.setRole = this.setRole.bind(this);
    this.setApartment = this.setApartment.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setUsername(event) {
    this.setState({ username: event.target.value });
  }
  setPassword(event) {
    this.setState({ password: event.target.value });
  }
  setRole(event) {
    this.setState({ role: event.target.value });
  }
  setApartment(event) {
    this.setState({ apartment: event.target.value });
  }
  handleSubmit = async () => {
    const { username, password, role, apartment } = this.state;
    const { onCreateFinish } = this.context;
    if (!username || !role) {
      alert("Please fill in all required fields.");
      return;
    }
    const userData = {
      username: username,
      password: password,
      role: role,
      apartment: apartment || undefined,
    };
    await this.props.createUser(userData);
    this.setState({
      username: "",
      password: "",
      role: "",
      apartment: "",
    });
    onCreateFinish();
  };

  async componentDidMount() {
    await this.props.fetchRoleList();
  }

  render() {
    const { createModalVisible, onCreate, onCreateFinish } = this.context;
    const { roleList } = this.props;

    if (!createModalVisible) {
      return null;
    }

    return (
      <div className={classes.modalBackdrop}>
        <div className={classes.modal}>
          <h2>Create New User</h2>
          <label>
            Username:
            <input
              type="text"
              value={this.state.username}
              onChange={this.setUsername}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={this.state.password}
              onChange={this.setPassword}
            />
          </label>

          <label>
            Role:
            <select value={this.state.role} onChange={this.setRole}>
              <option value="Select Role">Select Role</option>
              {roleList.map((r) => (
                <option key={r._id} value={r._id}>
                  {r.role}
                </option>
              ))}
            </select>
          </label>

          <label>
            Apartment (optional):
            <input
              type="text"
              value={this.state.apartment}
              onChange={this.setApartment}
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateUserModal);
