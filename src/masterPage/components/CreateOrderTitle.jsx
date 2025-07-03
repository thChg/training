import React, { Component } from "react";
import classes from "../../css/modules/components/FunctionTitle.module.css";

export class CreateOrderTitle extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { title } = this.props;

    return (
      <div className={classes.container}>
        <div className={classes.titleName} style={{ padding: "12px 15px" }}>
          {title}
        </div>
      </div>
    );
  }
}

export default CreateOrderTitle;
