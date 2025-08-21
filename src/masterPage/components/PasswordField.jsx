import _ from "lodash";
import React, { Component } from "react";
import classes from "../../css/modules/components/PasswordField.module.css";

export class PasswordField extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { label, placeholder, rowId, required } = this.props;
    const { self } = this.context;
    const { onTextFieldChange, state } = self;
    const { data, isEditing } = state;

    const attribute = _.camelCase(label);
    const fieldValue = data[attribute];

    return (
      <div className={classes.container}>
        <label className={classes.label}>
          {label}
          {required && <span className={classes.requiredStar}>*</span>}
        </label>
        <span className={classes.currency}>$</span>
        <input
          type="password"
          placeholder={placeholder}
          className={classes.field}
          value={fieldValue}
          disabled={!isEditing}
          name={attribute}
          onChange={onTextFieldChange}
          data-row-id={rowId}
        />
      </div>
    );
  }
}

export default PasswordField;
