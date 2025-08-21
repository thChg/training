import React, { Component } from "react";
import classes from "../../css/modules/components/SelectField.module.css";
import _ from "lodash";

export class SelectField extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { onSelectFieldChange, state, props } = this.context.self;
    const { object } = props.data;
    const {
      label,
      options,
      onSelect: userDefinedOnSelect,
      name,
      rowId,
    } = this.props;
    const { data, isEditing } = state;
    const splittedName = name.split(".");

    let selected;
    let required = false;
    if (splittedName.length > 1) {
      let currentObject = object[splittedName[0]].data;
      for (let i = 1; i < splittedName.length - 1; i++) {
        currentObject = currentObject[splittedName[i]].data;
      }
      if (currentObject.required) required = true;
    } else {
      if (object[name].required) required = true;
    }

    if (splittedName.length > 1) {
      let currentArr = data[splittedName[0]].data;
      for (let i = 1; i < splittedName.length - 2; i++) {
        currentArr = currentArr[splittedName[i]].data;
      }
      selected = currentArr.find((e) => e.id === rowId)[
        splittedName[splittedName.length - 1]
      ];
    } else {
      selected = data[name];
    }

    return (
      <div className={classes.container}>
        {label && (
          <label className={classes.label} htmlFor={name}>
            {label}
            {required && <span className={classes.requiredStar}>*</span>}
          </label>
        )}
        <select
          name={name}
          id={name}
          className={classes.select}
          value={selected || ""}
          onChange={userDefinedOnSelect || onSelectFieldChange}
          disabled={!isEditing}
          data-row-id={rowId}
        >
          <option value="" hidden></option>
          {options && options.map((o) => (
            <option value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>
    );
  }
}

export default SelectField;
