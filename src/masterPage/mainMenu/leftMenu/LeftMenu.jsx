import React, { Component } from "react";
import classes from "../../../css/masterPage/mainMenu/leftMenu/LeftMenu.module.css";
import LeftMenuButton from "./LeftMenuButton";
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "./LeftMenuMap";

export class LeftMenu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={classes.container}>
        {this.props.access.map((page, index) => 
          <LeftMenuButton name={page.menu} key={index} />
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftMenu);
