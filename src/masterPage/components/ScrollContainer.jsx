import React, { Component } from "react";
import classes from "../../css/modules/components/ScrollContainer.module.css";

export class ScrollContainer extends Component {
  render() {
    const { height = "200px", name } = this.props;
    return (
      <div style={{ width: "100%" }}>
        {name && <div className={classes.label}>{name}</div>}
        <div
          className={classes.container}
          style={{
            height: height,
          }}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default ScrollContainer;
