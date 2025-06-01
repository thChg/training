import React, { Component } from "react";
import classes from "../../../css/modules/components/ListActionList.module.css";
import { FILTER_LIST } from "../constants/ListActionList";
import { EmployeeListContext } from "./EmployeeListProvider";

export class ListActionList extends Component {
  static contextType = EmployeeListContext;
  constructor(props) {
    super(props);

    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.context.computeFilterCount(this.props.data, FILTER_LIST);
  }

  handleClick(event) {
    event.preventDefault();
    const { handleCurrentFilter } = this.context;
    handleCurrentFilter(event.target.firstChild.data, this.props.data);
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

export default ListActionList;
