import React, { Component } from "react";
import classes from "../../css/modules/components/ActionButtons.module.css";
import { FaCheck, FaClipboardCheck, FaPen, FaTimes } from "react-icons/fa";
import { isObjectId } from "../utils/CommonHelper";

export class FormActionButtons extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { self } = this.context;
    const { handleCreate } = this.props;
    const { state, onSave, onCreate, editToggle } = self;
    const { isEditing, id } = state;

    return isObjectId(id) ? (
      <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
        <button className={classes.btn}>
          <FaClipboardCheck className={classes.icon} />
        </button>
        <button className={classes.btn}>
          <FaTimes className={classes.icon} />
        </button>
        {isEditing ? (
          <button className={classes.btn} onClick={onSave}>
            <FaCheck className={classes.icon} />
          </button>
        ) : (
          <button className={classes.btn} onClick={editToggle}>
            <FaPen className={classes.icon} />
          </button>
        )}
      </div>
    ) : (
      <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
        <button className={classes.btn} onClick={handleCreate || onCreate}>
          <FaCheck className={classes.icon} />
        </button>
      </div>
    );
  }
}

export default FormActionButtons;
