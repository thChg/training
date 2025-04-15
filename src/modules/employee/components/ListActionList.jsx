import React, { Component } from "react";
import classes from "../../../css/modules/components/ListActionList.module.css";
import { FILTER_LIST } from "../constants/ListActionList";
import { EMPLOYEE_LIST } from "../constants/ListDummyData";
import EmployeeContext from "./EmployeeContext";
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "../containers/EmployeeMap";

export class ListActionList extends Component {
  static contextType = EmployeeContext;
  constructor(props) {
    super(props);

    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.context.computeFilterCount(EMPLOYEE_LIST, FILTER_LIST);
  }

  handleClick(event) {
    event.preventDefault();
    const { handleCurrentFilter } = this.context;
    console.log(event.target.firstChild.data);
    console.log(this.props.employees);
    handleCurrentFilter(event.target.firstChild.data, this.props.employees);
  }

  render() {
    const { filterCount } = this.context;
    return (
      <div className={classes.container}>
        {FILTER_LIST.map((element, index) => (
          <button
            key={index}
            className={classes.btn}
            onClick={this.handleClick}
          >
            {element} ({filterCount[element]})
          </button>
        ))}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListActionList);
