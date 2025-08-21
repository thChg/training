import React, { Component } from "react";
import classes from "../../../css/masterPage/mainMenu/leftMenu/LeftMenu.module.css";
import LeftMenuButton from "./LeftMenuButton";
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "./LeftMenuMap";
import { uniq } from "lodash";

export class LeftMenu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { userData } = this.props;
    return (
      <div className={classes.container}>
        {userData.moduleList.map((m) => (
          <LeftMenuButton name={m.moduleName} key={m.moduleId} />
        ))}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftMenu);
