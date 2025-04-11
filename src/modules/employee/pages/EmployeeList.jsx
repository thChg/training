import React, { Component } from "react";
import ListTitle from "../components/ListTitle";
import EmployeeProvider from "../components/EmployeeProvider";
import ListActionList from "../components/ListActionList"
import ListBody from "../components/ListBody";
export class EmployeeList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reloadKey: 0,
    };
    this.handleReload = this.handleReload.bind(this);
  }

  handleReload() {
    console.log("reload");
    this.setState((prevState) => ({ reloadKey: prevState.reloadKey + 1 }));
  }

  render() {
    return (
      <EmployeeProvider>
        <ListTitle title="Emloyee List" />

        <ListActionList />

        <ListBody>
          
        </ListBody>
      </EmployeeProvider>
    );
  }
}

export default EmployeeList;
