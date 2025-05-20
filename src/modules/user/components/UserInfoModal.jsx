import React, { Component } from "react";
import classes from "../../../css/modules/components/UserInfoModal.module.css";
import UserContext from "./UserContext";
import { connect } from "react-redux";
import {
  mapDispatchToProps,
  mapStateToProps,
} from "../containers/UserInfoModalMap";

class UserInfoModal extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
    };
  }

  handleEditToggle = () => {
    // this.setState((prevState) => ({ isEditing: !prevState.isEditing }));
  };

  handleChange = (e) => {
    // this.setState({ [e.target.name]: e.target.value });
  };

  handleSave = () => {
    // const { username, password, role, apartment } = this.state;
    // const updatedUser = {
    //   ...this.props.user,
    //   username,
    //   password,
    //   role,
    //   apartment,
    // };
    // this.props.onUpdate(updatedUser);
    // this.setState({ isEditing: false });
  };

  handleDelete = () => {
    // this.props.onDelete(this.props.user._id);
  };

  render() {
    if (!this.props.user) {
      return null;
    }
    const { onClose } = this.props;
    const { username, password, role, apartment } = this.props.user;
    const { isEditing } = this.state;

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
            Password:
            <input
              type="password"
              name="password"
              value={password}
              disabled={!isEditing}
              onChange={this.handleChange}
            />
          </label>

          <label>
            Role:
            <input
              type="text"
              name="role"
              value={role}
              disabled={!isEditing}
              onChange={this.handleChange}
            />
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
            <button onClick={onClose} className={classes.cancelBtn}>
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
