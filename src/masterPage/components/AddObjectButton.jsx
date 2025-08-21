import React, { Component } from "react";
import classes from "../../css/modules/components/AddObjectButton.module.css";
import { FaPlus } from "react-icons/fa";

export class AddObjectButton extends Component {
  constructor(props) {
    super(props);

    this.handleAddObject = this.handleAddObject.bind(this);
  }

  handleAddObject() {
    const {name} = this.props;
    const { onAddObject } = this.context.self;

    onAddObject(name);
  }

  render() {
    const { self } = this.context;
    const { isEditing } = self.state;

    return (
      <button
        className={isEditing ? classes.container : classes.disabled}
        onClick={this.handleAddObject}
      >
        <FaPlus className={classes.icon} />
      </button>
    );
  }
}

export default AddObjectButton;
