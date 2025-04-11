import React, { Component } from "react";
import classes from "../../css/masterPage/subMenu/SearchBar.module.css";
import { PiMagnifyingGlass } from "react-icons/pi";

export class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.hanldeOnChange = this.hanldeOnChange.bind(this);
  }
  hanldeOnChange(event) {
    this.props.onChange(event.target.value)
  }

  render() {
    return (
      <div className={classes.container}>
        <input
          type="text"
          className={classes.searchInput}
          onChange={this.hanldeOnChange}
        />
        <PiMagnifyingGlass className={classes.icon}></PiMagnifyingGlass>
      </div>
    );
  }
}

export default SearchBar;
