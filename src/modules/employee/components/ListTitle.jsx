import React, { Component } from "react";
import { TfiReload } from "react-icons/tfi";
import { RxMagnifyingGlass } from "react-icons/rx";
import { HiDocument } from "react-icons/hi2";
import { FaPlus } from "react-icons/fa";
import EmployeeContext from "./EmployeeContext";
import classes from "../../../css/modules/components/ListTitle.module.css";
import { PiMagnifyingGlass } from "react-icons/pi";

export class ListTitle extends Component {
    static contextType = EmployeeContext;

  render() {
    const { title } = this.props;
    const {handleReload} = this.context;

    return (
      <div className={classes.container}>
        <div className={classes.title}>{title}</div>
        <div className={classes.utilities}>
          <div className={classes.searchBarContainer}>
            <input type="text" className={classes.searchBar} />
            <PiMagnifyingGlass className={classes.searchIcon}></PiMagnifyingGlass>
          </div>
          <button className={classes.btn} onClick={handleReload}>
            <TfiReload className={classes.icon}></TfiReload>
          </button>
          <button className={classes.btn}>
            <RxMagnifyingGlass className={classes.icon}></RxMagnifyingGlass>
          </button>
          <button className={classes.btn}>
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

export default ListTitle;
