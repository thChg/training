import React, { Component } from "react";
import classes from "../../../css/modules/components/FunctionTitle.module.css";
import { FaCheck } from "react-icons/fa";
import { connect } from "react-redux";
import {
  mapDispatchToProps,
  mapStateToProps,
} from "../containers/POApproveDetailMap";
import { PiMagnifyingGlass } from "react-icons/pi";

export class FunctionTitle extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { title, onApprove, pagePermissions, purchaseOrder, onSearch } =
      this.props;
    return (
      <div className={classes.container}>
        <div className={classes.titleName}>{title}</div>
        <div className={classes.titleActions}>
          <div className={classes.searchBarContainer}>
            <input
              type="text"
              className={classes.searchBar}
              onChange={this.handleSearch}
            />
            <PiMagnifyingGlass
              className={classes.searchIcon}
            ></PiMagnifyingGlass>
          </div>
          {pagePermissions.includes("approve") && (
            <button
              onClick={onApprove}
              style={
                purchaseOrder.status !== "pending"
                  ? { backgroundColor: "hsl(204, 72%, 50%, 0.4)" }
                  : {}
              }
              className={classes.disabled}
            >
              <FaCheck />
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FunctionTitle);
