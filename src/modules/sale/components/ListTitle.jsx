import React, { Component } from "react";
import { TfiReload } from "react-icons/tfi";
import { RxMagnifyingGlass } from "react-icons/rx";
import { HiDocument } from "react-icons/hi2";
import { FaPlus } from "react-icons/fa";
import SaleContext from "./SaleContext";
import classes from "../../../css/modules/components/ListTitle.module.css";
import { PiMagnifyingGlass } from "react-icons/pi";
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "../containers/SaleMap";

export class ListTitle extends Component {
  static contextType = SaleContext;

  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    const orders = this.props.orders || [];
    const result = searchTerm
      ? orders.filter((order) =>
          order.name.toLowerCase().includes(searchTerm)
        )
      : orders;
  
    this.context.setSearchResult(result);
  }

  onCreate() {
    // this.props.fetchCreatePermission();
  }

  render() {
    const { title } = this.props;
    const { handleReload } = this.context;

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
          <button className={classes.btn} onClick={handleReload}>
            <TfiReload className={classes.icon}></TfiReload>
          </button>
          <button className={classes.btn}>
            <RxMagnifyingGlass className={classes.icon}></RxMagnifyingGlass>
          </button>
          <button className={classes.btn} onClick={this.onCreate}>
            <FaPlus className={classes.icon}></FaPlus>
          </button>
          <button className={classes.btn}>
            <HiDocument className={classes.icon} strokeWidth={2.5}></HiDocument>
          </button>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListTitle);
