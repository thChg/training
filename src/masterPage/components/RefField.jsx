import React, { Component } from "react";
import classes from "../../css/modules/components/RefField.module.css";
import _ from "lodash";

export class RefField extends Component {
  render() {
    const { props, context } = this;
    const { self } = context;
    const { label, value } = props;

    const camelCaseName = _.camelCase(label);
    const fieldValue = self.state.data[camelCaseName] || value;
    
    return (
      <div className={classes.container}>
        <label className={classes.label}>{label}</label>
        <input
          type="text"
          className={classes.field}
          value={fieldValue}
          disabled
        />
      </div>
    );
  }
}

export default RefField;
