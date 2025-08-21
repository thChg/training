import React, { Component } from "react";
import classes from "../../css/modules/components/DateField.module.css";
import _ from "lodash";

export class DateField extends Component {
  render() {
    const { label } = this.props;
    const { self } = this.context;
    const { onTextFieldChange, state, props } = self;
    const { data, isEditing } = state;
    const { object } = props.data;

    const attribute = _.camelCase(label);
    const fieldData = data[attribute];

    return (
      <div className={classes.container}>
        <label className={classes.label}>
          {label}{" "}
          {object[attribute].required && (
            <span className={classes.requiredStar}>*</span>
          )}
        </label>
        <input
          type="date"
          className={classes.field}
          value={fieldData}
          disabled={!isEditing}
          name={attribute}
          onChange={onTextFieldChange}
        />
      </div>
    );
  }
}

export default DateField;
