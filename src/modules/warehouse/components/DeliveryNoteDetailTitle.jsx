import React, { Component } from "react";
import classes from "../../../css/modules/components/OrderDetailTitle.module.css";
import { FaCheck, FaTimes } from "react-icons/fa";

export class DeliveryNoteDetailTitle extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.handleResolve = this.handleResolve.bind(this);
  }

  handleResolve(event) {
    this.props.onResolve(event.currentTarget.value);
  }

  render() {
    const { permissions, curStatus } = this.props;
    return (
      <div
        className={classes.container}
        style={{ flexDirection: "column", alignItems: "flex-start" }}
      >
        <div
          className={classes.titleContainer}
          style={{ borderBottom: "none" }}
        >
          <div className={classes.title}>Delivery Note Detail</div>

          {permissions.includes("update") && curStatus === "pending" && (
            <div className={classes.utilities}>
              <button
                className={classes.btn}
                value="accepted"
                onClick={this.handleResolve}
              >
                <FaCheck className={classes.icon}></FaCheck>
              </button>
              <button
                className={classes.btn}
                value="declined"
                onClick={this.handleResolve}
              >
                <FaTimes className={classes.icon}></FaTimes>
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default DeliveryNoteDetailTitle;
