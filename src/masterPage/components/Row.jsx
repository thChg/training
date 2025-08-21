import React, { Component } from "react";
import classes from "../../css/modules/components/Row.module.css";

export class Row extends Component {
  render() {
    return <div className={classes.row}>{this.props.children}</div>;
  }
}

export default Row;
