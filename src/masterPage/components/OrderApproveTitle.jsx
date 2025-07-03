import React, { Component } from "react";
import classes from "../../css/modules/components/FunctionTitle.module.css";
import { FaCheck } from "react-icons/fa";
import { PiMagnifyingGlass } from "react-icons/pi";

export class OrderApproveTitle extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(event) {
    this.props.onSearch(event.target.value);
  }

  render() {
    const { title, onApprove, pagePermissions, order } = this.props;
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
              className={
                order.status !== "pending" ? classes.disabled : classes.btn
              }
            >
              <FaCheck />
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default OrderApproveTitle;
