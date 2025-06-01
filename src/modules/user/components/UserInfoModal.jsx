import React, { Component } from "react";
import classes from "../../../css/modules/components/UserInfoModal.module.css";
import { UserManagementContext } from "./UserManagementProvider";
import { connect } from "react-redux";
import {
  mapDispatchToProps,
  mapStateToProps,
} from "../containers/UserManagementMap";

class UserInfoModal extends Component {
  static contextType = UserManagementContext;

  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      username: "",
      role: "",
      apartment: "",
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleEditToggle = this.handleEditToggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRoleChange = this.handleRoleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    if (this.props.roleList.length <= 0) {
      this.props.fetchRoleList();
    }

    const userID = this.context.selectedUserId;
    const { username, role, apartment } = this.props.userList.find(
      (user) => user._id === userID
    );
    this.setState({
      username: username,
      role: role,
      apartment: apartment,
    });
  }
  handleEditToggle() {
    this.setState((prevState) => ({ isEditing: !prevState.isEditing }));
  }

  handleRoleChange(event) {
    const { roleList } = this.props;
    const selectedRole = roleList.find(
      (role) => role.role === event.target.value
    );
    this.setState({ role: selectedRole });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleClose() {
    this.context.setSelectedUserId(null);
  }

  handleSave() {
    const { username, role, apartment } = this.state;
    const { selectedUserId } = this.context;

    const updatingUser = {
      username,
      role: role._id,
      apartment,
    };
    this.props.updateUser(selectedUserId, updatingUser);
    this.setState({ isEditing: false });
  }

  handleDelete = () => {
    this.props.deleteUser(this.context.selectedUserId);
    this.context.setSelectedUserId(null);
  };

  render() {
    const { username, role, apartment, isEditing } = this.state;
    const { roleList } = this.props;

    return (
      <div className={classes.modalBackdrop}>
        <div className={classes.modal}>
          <h2>User Information</h2>

          <label>
            Username:
            <input
              type="text"
              name="username"
              value={username}
              disabled={!isEditing}
              onChange={this.handleChange}
            />
          </label>

          <label>
            Role:
            <select
              name="role"
              value={role.role}
              disabled={!isEditing}
              onChange={this.handleRoleChange}
            >
              {roleList?.map((r) => (
                <option key={r._id} value={r.role}>
                  {r.role}
                </option>
              ))}
            </select>
          </label>

          <label>
            Apartment:
            <input
              type="text"
              name="apartment"
              value={apartment}
              disabled={!isEditing}
              onChange={this.handleChange}
            />
          </label>

          <div className={classes.modalButtons}>
            <button onClick={this.handleClose} className={classes.cancelBtn}>
              Close
            </button>

            {isEditing ? (
              <button onClick={this.handleSave} className={classes.saveBtn}>
                Save
              </button>
            ) : (
              <button
                onClick={this.handleEditToggle}
                className={classes.editBtn}
              >
                Edit
              </button>
            )}

            <button onClick={this.handleDelete} className={classes.deleteBtn}>
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfoModal);
