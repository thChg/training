import React from "react";
import { createPortal } from "react-dom";
import classes from "../../../css/masterPage/mainMenu/RightButton.module.css";

const UserDropdown = React.forwardRef(
  ({ user, dropdownStyle, onLogout }, ref) => {
    if (typeof document === "undefined" || !document.body) return null;

    return createPortal(
      <div ref={ref} style={dropdownStyle} className={classes.userDropdown}>
        <div>
          <p>{user.username}</p>
          <p className={classes.userRole}>
            <i>Role:</i> {user.role}
          </p>
        </div>
        <button className={classes.userLogoutButton} onClick={onLogout}>
          Logout
        </button>
      </div>,
      document.body
    );
  }
);
export default UserDropdown;
