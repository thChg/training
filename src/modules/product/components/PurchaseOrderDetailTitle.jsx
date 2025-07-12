import React, { Component } from "react";
import classes from "../../../css/modules/components/OrderDetailTitle.module.css";
import { FaCheck, FaPen, FaTimes } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";

export class PurchaseOrderDetailTitle extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.handleResolve = this.handleResolve.bind(this);
  }

  handleResolve(event) {
    const action = event.currentTarget.value;
    this.props.onResolve(action);
  }

  render() {
    const {
      curStatus,
      permissions,
      onEdit,
      isEditing,
      onSave,
      onDelete,
      page,
    } = this.props;
    return (
      <div
        className={classes.container}
        style={{ flexDirection: "column", alignItems: "flex-start" }}
      >
        <div className={classes.titleContainer}>
          <div className={classes.title}>Purchase Order Detail</div>
          {curStatus === "pending" && (
            <div className={classes.utilities}>
              {page !== "accounting" && permissions.includes("update") ? (
                isEditing ? (
                  <button className={classes.btn} onClick={onSave}>
                    <FaCheck className={classes.icon}></FaCheck>
                  </button>
                ) : (
                  <button className={classes.btn} onClick={onEdit}>
                    <FaPen className={classes.icon}></FaPen>
                  </button>
                )
              ) : null}
              {permissions.includes("delete") && (
                <button className={classes.btn} onClick={onDelete}>
                  <FaTrashCan className={classes.icon}></FaTrashCan>
                </button>
              )}
              {permissions.includes("resolve") && (
                <button
                  onClick={this.handleResolve}
                  value="approved"
                  className={classes.btn}
                >
                  <FaCheck className={classes.icon} />
                </button>
              )}
              {permissions.includes("resolve") && (
                <button
                  onClick={this.handleResolve}
                  value="declined"
                  className={classes.btn}
                >
                  <FaTimes className={classes.icon} />
                </button>
              )}
            </div>
          )}
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
              className={
                curStatus === "pending"
                  ? classes.activeState
                  : classes.inactiveState
              }
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
              className={
                curStatus === "approved"
                  ? classes.activeState
                  : curStatus === "declined"
                  ? classes.declinedState
                  : classes.inactiveState
              }
              style={{
                flex: 1,
                padding: "5px",
                height: "100%",
                textAlign: "center",
                borderRight: "1px solid #ccc",
              }}
            >
              {curStatus === "declined" ? "Declined" : "Approved"}
            </div>
            <div
              className={
                curStatus === "completed"
                  ? classes.activeState
                  : curStatus === "declined"
                  ? classes.declinedState
                  : classes.inactiveState
              }
              style={{
                flex: 1,
                padding: "5px",
                height: "100%",
                textAlign: "center",
              }}
            >
              {curStatus === "declined" ? "Declined" : "Completed"}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PurchaseOrderDetailTitle;
