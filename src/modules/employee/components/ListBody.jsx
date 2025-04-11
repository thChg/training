import React, { Component } from "react";
import classes from "../../../css/modules/components/ListBody.module.css"
export class ListBody extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return <table className={classes.container}>
        {this.props.children}
    </table>;
  }
}

export default ListBody;
