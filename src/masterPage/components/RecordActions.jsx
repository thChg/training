import React, { Component } from "react";
import { GoTriangleUp } from "react-icons/go";
import classes from "../../css/modules/components/RecordActions.module.css";

const BASE_ACTIONS = ["DESELECT"];
const ACTIONS = ["PRINT", "DELETE"];

export class RecordActions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropDownVisible: false,
    };

    this.toggleActionDropDown = this.toggleActionDropDown.bind(this);
  }

  toggleActionDropDown() {
    this.setState((prevState) => ({
      dropDownVisible: !prevState.dropDownVisible,
    }));
  }

  render() {
    if (!this.context?.self) return null;
    const { self } = this.context;
    const { dropDownVisible } = this.state;
    const { selectedRecords } = self.state.data;

    const userActions = BASE_ACTIONS.map((action) => (
      <button value={action} onClick={this.handleActionClick} key={action}>
        {action}
      </button>
    )).concat(
      ACTIONS.map((action) => (
        <button value={action} onClick={this.handleActionClick}>
          {action}
        </button>
      ))
    );
    return (
      selectedRecords.length > 0 && (
        <div className={classes.actionContainer}>
          <div className={classes.actions} onClick={this.toggleActionDropDown}>
            <div>Actions... </div>
            <GoTriangleUp size={15} />
          </div>
          with {selectedRecords.length} record(s).
          <div
            className={dropDownVisible ? classes.actionDropDown : classes.disabled}
            style={{
              top: `calc(-28px - (${userActions.length} - 1) * 26px)`,
            }}
          >
            {userActions}
          </div>
        </div>
      )
    );
  }
}

export default RecordActions;
