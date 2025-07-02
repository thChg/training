import React, { Component } from "react";
import classes from "../../../css/modules/components/FunctionTitle.module.css";
import { FaCheck, FaPen } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { connect } from "react-redux";
import {
  mapDispatchToProps,
  mapStateToProps,
} from "../containers/UserManagementMap";

export class FunctionTitle extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { title, isEditing, onSave, onEditToggle, onDelete, permissions } =
      this.props;

    return (
      <div className={classes.container}>
        <div className={classes.titleName}>{title}</div>
        <div className={classes.titleActions}>
          {permissions.includes("[users:edit]") && isEditing ? (
            <button onClick={onSave} className={classes.btn}>
              <FaCheck />
            </button>
          ) : (
            <button onClick={onEditToggle} className={classes.btn}>
              <FaPen />
            </button>
          )}
          {permissions.includes("[users:delete]") && (
            <button onClick={onDelete} className={classes.btn}>
              <FaTrashCan />
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FunctionTitle);
