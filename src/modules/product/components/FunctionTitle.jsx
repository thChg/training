import React, { Component } from "react";
import classes from "../../../css/modules/components/FunctionTitle.module.css";
import { connect } from "react-redux";
import {
  mapDispatchToProps,
  mapStateToProps,
} from "../containers/BillOfLadingMap";
import { PiMagnifyingGlass } from "react-icons/pi";
import { HiDocument } from "react-icons/hi2";
import { BOLDetailContext } from "./BOLDetailProvider";

export class FunctionTitle extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(event) {
    this.props.onSearch(event.target.value);
  }

  render() {
    const { title } = this.props;

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
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FunctionTitle);
