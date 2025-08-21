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
    this.context.handleSelectModule(name);
  }

  render() {
    const { name } = this.props;
    const { currentModule } = this.context;
    return (
      <div className={currentModule === name ? classes.container_active : classes.container} onClick={this.onClick}>
        {name}
      </div>
    );
  }
}

export default LeftMenuButton;
