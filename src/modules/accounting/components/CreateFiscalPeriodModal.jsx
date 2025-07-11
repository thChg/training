import React, { Component } from "react";
import classes from "../../../css/modules/components/CreateUserModal.module.css";
import { connect } from "react-redux";
import {
  mapDispatchToProps,
  mapStateToProps,
} from "../containers/FiscalPeriodMap";
import { FiscalPeriodContext } from "./FiscalPeriodProvider";

export class CreateFicalPeriodModal extends Component {
  static contextType = FiscalPeriodContext;
  constructor(props) {
    super(props);

    this.state = {
      openDate: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
  }

  handleInputChange(event) {
    this.setState({ openDate: event.target.value });
  }

  handleCreate() {
    const { openDate } = this.state;
    this.context.handleCreate(openDate);
  }

  render() {
    const { toggleCreateModalVisible } = this.context;

    return (
      <div className={classes.modalBackdrop}>
        <div className={classes.modal}>
          <h2>Create New Fiscal Period</h2>
          <label>
            Open Date:
            <input
              type="date"
              value={this.state.openDate}
              onChange={this.handleInputChange}
            />
          </label>
          <div className={classes.modalButtons}>
            <button
              onClick={toggleCreateModalVisible}
              className={classes.cancelBtn}
            >
              Cancel
            </button>
            <button onClick={this.handleCreate} className={classes.createBtn}>
              Create
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateFicalPeriodModal);
