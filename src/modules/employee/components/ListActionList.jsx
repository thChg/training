import React, { Component } from "react";
import classes from "../../../css/modules/components/ListActionList.module.css";
import { FILTER_LIST } from "../constants/ListActionList";
import { EMPLOYEE_LIST } from "../constants/ListDummyData";
import EmployeeContext from "./EmployeeContext";

export class ListActionList extends Component {
  static contextType = EmployeeContext;
  constructor(props) {
    super(props);

    
  }

  componentDidMount() {
    this.context.computeFilterCount(EMPLOYEE_LIST, FILTER_LIST);
  }

  render() {
    const { filterCount, setCurrentFilter } = this.context;
    return (
      <div className={classes.container}>
        {FILTER_LIST.map((element, index) => (
          <button key={index} className={classes.btn} onClick={setCurrentFilter}>
            {element} ({filterCount[element]})
          </button>
        ))}
      </div>
    );
  }
}

export default ListActionList;
