import React, { Component } from "react";
import classes from "../../css/modules/components/ActionButtons.module.css";
import { FaCheck, FaPlus, FaTimes } from "react-icons/fa";
import { HiDocument } from "react-icons/hi2";
import { TfiReload } from "react-icons/tfi";
import { Link } from "react-router-dom";
import { HTTP_METHOD } from "../../constants/httpMethod";
import { ACTIONS } from "../../constants/action";

export class ActionButtons extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleReload = this.handleReload.bind(this);
  }

  handleReload() {
    this.context.self.setState({
      searchResult: null,
    });
  }

  handleCreate() {}

  render() {
    const { self } = this.context;
    const { accessList } = self.state;

    const path = window.location.pathname;
    if (!accessList) return;
    return (
      <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
        <button className={classes.btn} onClick={this.handleReload}>
          <TfiReload className={classes.icon} />
        </button>
        {accessList.includes(ACTIONS.CREATE) && (
          <Link to={`${path}/0`} className={`${classes.btn} ${classes.link}`}>
            <FaPlus className={classes.icon} />
          </Link>
        )}
        <button className={classes.btn}>
          <HiDocument className={classes.icon} />
        </button>
      </div>
    );
  }
}

export default ActionButtons;
