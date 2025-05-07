import React, { Component } from "react";
import LeftMenu from "./leftMenu/LeftMenu";
import classes from "../../css/masterPage/mainMenu/MainMenu.module.css";
import RightButton from "./rightButton/RightButton";

export class MainMenu extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className={classes.container}>
        <LeftMenu />
        <RightButton />
      </div>
    );
  }
}

export default MainMenu;
