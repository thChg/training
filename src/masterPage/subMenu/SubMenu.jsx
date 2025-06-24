import React, { Component } from "react";
import SearchBar from "./SearchBar";
import classes from "../../css/masterPage/subMenu/SubMenu.module.css";
import PageContext from "../utils/PageContext";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "./SubMenuMap";

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

        {this.props.access
          .find((page) => page.menu === currentPage)
          ?.subMenu.filter((subPage) =>
            subPage.toLowerCase().includes(this.state.query.toLowerCase())
          )
          .map((item) => (
            <Link
              className={classes.item}
              key={item}
              to={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {item}
            </Link>
          ))}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubMenu);
