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
      <div
        className={classes.container}
        style={{ flexDirection: "column", alignItems: "flex-start" }}
      >
        <div
          className={classes.titleName}
          style={{
            padding: "12px 15px",
            borderBottom: "1px solid #ccc",
            width: "100%"
          }}
        >
          {title}
        </div>
        <div style={{ width: "100%", height: "45px", padding: "5px 20px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              height: "100%",
              border: "1px solid #ccc",
              fontWeight: "bold",
            }}
          >
            <div
              className={classes.activeState}
              style={{
                flex: 1,
                padding: "5px",
                height: "100%",
                textAlign: "center",
                borderRight: "1px solid #ccc",
              }}
            >
              Pending
            </div>
            <div
              className={classes.inactiveState}
              style={{
                flex: 1,
                padding: "5px",
                height: "100%",
                textAlign: "center",
                borderRight: "1px solid #ccc",
              }}
            >
              Approved
            </div>
            <div
              className={classes.inactiveState}
              style={{
                flex: 1,
                padding: "5px",
                height: "100%",
                textAlign: "center",
              }}
            >
              Completed
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateOrderTitle;
