import React, { Component } from "react";
import classes from "../../../css/modules/components/FunctionTitle.module.css";

export class DetailTitle extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { title } = this.props;
    return (
      <div
        className={classes.container}
        style={{ flexDirection: "column", alignItems: "flex-start" }}
      >
        <div
          className={classes.titleName}
          style={{
            padding: "12px 15px",
            width: "100%",
          }}
        >
          {title}
        </div>
      </div>
    );
  }
}

export default DetailTitle;
