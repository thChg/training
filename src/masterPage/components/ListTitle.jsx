import React, { Component } from "react";
import { HiDocument } from "react-icons/hi2";
import { FaPlus } from "react-icons/fa";
import classes from "../../css/modules/components/ListTitle.module.css";
import { PiMagnifyingGlass } from "react-icons/pi";

export class ListTitle extends Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(event) {
    this.props.onSearch(event.target.value);
  }

  render() {
    const { title, selectedRecords, onCreate, exportToExcel } = this.props;
    return (
      <div className={classes.container}>
        <div className={classes.title}>{title}</div>
        <div className={classes.utilities}>
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

          <button className={classes.btn} onClick={onCreate}>
            <FaPlus className={classes.icon}></FaPlus>
          </button>

          <button
            className={
              selectedRecords.length === 0 ? classes.disabled : classes.btn
            }
            onClick={exportToExcel}
          >
            <HiDocument className={classes.icon} strokeWidth={2.5}></HiDocument>
          </button>
        </div>
      </div>
    );
  }
}

export default ListTitle;
