import React, { Component } from "react";
import classes from "../../css/modules/components/OrderDetailTitle.module.css";
import { FaCheck, FaPen } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";

export class OrderDetailTitle extends Component {
  render() {
    const { curStatus, permissions, onEdit, isEditing, onSave, onDelete } =
      this.props;
    return (
      <div
        className={classes.container}
        style={{ flexDirection: "column", alignItems: "flex-start" }}
      >
        <div className={classes.titleContainer}>
          <div className={classes.title}>Order Detail</div>
          {curStatus === "pending" && (
            <div className={classes.utilities}>
              {permissions.includes("update") ? (
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
                curStatus === "accepted" || curStatus === "declined"
                  ? classes.activeState
                  : classes.inactiveState
              }
              style={{
                flex: 1,
                padding: "5px",
                height: "100%",
                textAlign: "center",
              }}
            >
              {curStatus === "declined" ? "Declined" : "Accepted"}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderDetailTitle;
