import React, { Component } from "react";
import classes from "../../../css/masterPage/mainMenu/leftMenu/LeftMenu.module.css";
import { MENU_LIST } from "../../../constants/mainMenuConstants";
import LeftMenuButton from "./LeftMenuButton";

export class LeftMenu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    
    return (
      <div className={classes.container}>
        {MENU_LIST.map((element, index) => (
          <LeftMenuButton name={element} key={index}/>
        ))}
      </div>
    );
  }
}

export default LeftMenu;
