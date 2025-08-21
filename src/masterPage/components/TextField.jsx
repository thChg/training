import _ from "lodash";
import React, { Component } from "react";
import classes from "../../css/modules/components/TextField.module.css";
import { DATA_TYPE } from "../../constants/dataType";

export class TextField extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // 1. Get rowId from props. This is a crucial step.
    const { label, placeholder, name, rowId } = this.props;
    const { onTextFieldChange, state, props: contextProps } = this.context.self;
    const { data: formData, isEditing } = state;
    const { object: schema } = contextProps.data;

    const effectiveName = name || _.camelCase(label);

    if (!effectiveName) {
      return null;
    }

    const path = effectiveName.split(".");
    const fieldName = path.pop();

    const parentSchema = path.reduce((obj, key) => obj?.[key]?.data, schema);
    const parentData = path.reduce((obj, key) => obj?.[key]?.data, formData);

    const fieldSchema = parentSchema?.[fieldName];

    let fieldValue;
    if (rowId) {
      // If rowId exists, parentData is the array. Find the correct item.
      if (Array.isArray(parentData)) {
        const item = parentData.find((d) => String(d.id) === String(rowId));
        // Get the value from that specific item.
        fieldValue = item?.[fieldName];
      }
    } else {
      // Original logic for simple, non-array fields.
      fieldValue = parentData?.[fieldName];
    }

    const required = fieldSchema?.required || false;
    const isCurrency = fieldSchema?.type === DATA_TYPE.CURRENCY;
    const isPassword = fieldSchema?.type === DATA_TYPE.PASSWORD;

    return (
      <div className={classes.container}>
        {label && (
          <label className={classes.label} htmlFor={effectiveName}>
            {label}
            {required && <span className={classes.requiredStar}>*</span>}
          </label>
        )}
        {isCurrency && <span className={classes.currency}>$</span>}
        <input
          id={effectiveName}
          type={isPassword ? "password" : "text"}
          placeholder={placeholder}
          className={classes.field}
          value={!_.isPlainObject(fieldValue) ? fieldValue : ""}
          disabled={!isEditing}
          name={effectiveName}
          // 3. Pass the rowId to the input as a data-attribute.
          data-row-id={rowId}
          onChange={onTextFieldChange}
          style={{
            ...(isCurrency ? { paddingLeft: "20px" } : {}),
          }}
        />
      </div>
    );
  }
}

export default TextField;
