import React, { Component } from "react";
import { SUB_MENU } from "../../constants/subMenuConstants";
import SearchBar from "./SearchBar";
import classes from "../../css/masterPage/subMenu/SubMenu.module.css";
import PageContext from "../utils/PageContext";
import { Link } from "react-router-dom";

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
        {SUB_MENU.find((element) => element.page === currentPage)
  .items
  .filter((item) =>
    item.toLowerCase().includes(this.state.query.toLowerCase())
  )
  .map((item, index) => (
    <Link
      className={classes.item}
      key={index}
      to={`/${item.toLowerCase().replace(/\s+/g, '-')}`} // convert "Employee List" to "employee-list"
    >
      {item}
    </Link>
))}
      </div>
    );
  }
}

export default SubMenu;
