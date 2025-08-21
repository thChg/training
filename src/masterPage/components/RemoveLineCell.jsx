import React, { Component } from "react";
import classes from "../../css/modules/components/RemoveLineCell.module.css";
import { FaTimes } from "react-icons/fa";

export class RemoveLineCell extends Component {
  render() {
    const { name, value } = this.props;
    const { self } = this.context;
    const { onRemoveLine } = self;
    const { isEditing } = self.state;

    return (
      <td>
        <div
          className={isEditing ? classes.container : classes.disabledContainer}
          onClick={() => isEditing && onRemoveLine(name, value)}
        >
          <FaTimes className={classes.icon} />
        </div>
      </td>
    );
  }
}

export default RemoveLineCell;
