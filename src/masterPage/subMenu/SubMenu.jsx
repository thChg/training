import React, { Component } from "react";
import { SUB_MENU } from "../../constants/subMenuConstants";
import SearchBar from "./SearchBar";
import classes from "../../css/masterPage/subMenu/SubMenu.module.css";
import PageContext from "../utils/PageContext";

export class SubMenu extends Component {
  static contextType = PageContext;

  constructor(props) {
    super(props);

    this.state = {
      query: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(text) {
    this.setState({
      query: text,
    });
  }

  render() {
    const { currentPage } = this.context;
    return (
      <div className={classes.container}>
        <SearchBar onChange={this.handleInputChange} />
        {SUB_MENU.find((element) => element.page == currentPage)
          .items.filter((element) => element.toLowerCase().includes(this.state.query.toLowerCase()))
          .map((element, index) => (
            <div className={classes.item} key={index}>
              {element}
            </div>
          ))}
      </div>
    );
  }
}

export default SubMenu;
