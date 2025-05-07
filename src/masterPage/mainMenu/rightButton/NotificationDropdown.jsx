import React from "react";
import { createPortal } from "react-dom";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import classes from "../../../css/masterPage/mainMenu/RightButton.module.css";

const NotificationDropdown = React.forwardRef(({ notifications, onResolve, dropdownStyle }, ref) => {
  return createPortal(
    <div ref={ref} className={classes.notificationDropdown} style={dropdownStyle}>
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={
            notification.resolved
              ? classes.notificationDescription
              : classes.notificationDescriptionUnresolved
          }
        >
          <p>{notification.description}</p>
          {!notification.resolved && (
            <IoCheckmarkCircleSharp
              className={classes.checkIcon}
              onClick={() => onResolve(notification.id)}
            />
          )}
        </div>
      ))}
    </div>,
    document.body
  );
});

export default NotificationDropdown;
