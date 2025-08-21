import React, { Component } from "react";
import classes from "../../css/modules/components/FilterField.module.css";

export class FilterField extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    const { self } = this.context;
    const { name, field } = this.props;
    const { value } = event.target;

    self.setState((prevState) => ({
      data: {
        ...prevState.data,
        [name]: {
          ...prevState.data[name],
          filter: {
            ...prevState.data[name].filter,
            [field]: value,
          },
        },
      },
    }));
  }

  render() {
    const { type, label, name, field } = this.props;
    const { self } = this.context;
    const fieldValue = self.state.data[name].filter[field];

    if (type === "text") {
      return (
        <div className={classes.container}>
          <label className={classes.label}>
            {label}
          </label>
          <input
            type="text"
            className={classes.field}
            onChange={this.onChange}
            value={fieldValue}
          />
        </div>
      );
    }

    if (type === "select") {
      const { options } = this.props;
      return (
        <div className={classes.container}>
          <label className={classes.label}>{label}</label>
          <select className={classes.field} onChange={this.onChange} value={fieldValue}>
            <option value="" hidden></option>
            {options.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>
      );
    }
  }
}

export default FilterField;
