import React, { Component } from "react";
import classes from "../../../css/masterPage/mainMenu/leftMenu/LeftMenuButton.module.css";
import PageContext from "../../utils/PageContext";

export class LeftMenuButton extends Component {
  static contextType = PageContext;

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    const { name } = this.props;
    this.context.handlePageChange(name);
  }

  render() {
    const { name } = this.props;
    const { currentPage } = this.context;
    return (
      <div className={currentPage === name ? classes.container_active : classes.container} onClick={this.onClick}>
        {name}
      </div>
    );
  }
}

export default LeftMenuButton;
