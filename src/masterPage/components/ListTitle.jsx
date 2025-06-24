import React, { Component } from "react";
import { HiDocument } from "react-icons/hi2";
import { FaPlus } from "react-icons/fa";
import classes from "../../css/modules/components/ListTitle.module.css";
import { PiMagnifyingGlass } from "react-icons/pi";

export class ListTitle extends Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
  }

  handleSearch(event) {
    this.props.onSearch(event.target.value);
  }

  handleCreate() {
    this.props.onCreate();
  }

  render() {
    const { title, permissions } = this.props;
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
          {permissions.includes(`create`) && (
            <button className={classes.btn} onClick={this.handleCreate}>
              <FaPlus className={classes.icon}></FaPlus>
            </button>
          )}
          {permissions.includes(`print`) && (
            <button className={classes.btn}>
              <HiDocument
                className={classes.icon}
                strokeWidth={2.5}
              ></HiDocument>
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default ListTitle;
