import React, { Component } from "react";
import classes from "../../../css/modules/components/CreateModal.module.css";
import { connect } from "react-redux";
import {
  mapDispatchToProps,
  mapStateToProps,
} from "../containers/FiscalPeriodMap";
import { FiscalPeriodContext } from "./FiscalPeriodProvider";

export class FicalPeriodDetailModal extends Component {
  static contextType = FiscalPeriodContext;
  constructor(props) {
    super(props);

    this.state = {
      openDate: "",
      closeDate: "",
      status: "",
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleEndPeriod = this.handleEndPeriod.bind(this);
  }

  componentDidMount() {
    const { selectedFiscalPeriodId } = this.context;
    const { fiscalPeriodList } = this.props;

    const fiscalPeriodData = fiscalPeriodList.find(
      (fp) => fp._id === selectedFiscalPeriodId
    );

    this.setState({
      openDate: fiscalPeriodData.openDate,
      closeDate: fiscalPeriodData.closeDate,
      status: fiscalPeriodData.status,
    });
  }

  handleClose() {
    this.context.setSelectedFiscalPeriodId(null);
  }

  handleEndPeriod() {
    const { selectedFiscalPeriodId, currentPage, recordPerPage } = this.context;
    this.props.closeFiscalPeriod(
      selectedFiscalPeriodId,
      currentPage,
      recordPerPage
    );

    this.context.setSelectedFiscalPeriodId(null);
  }

  render() {
    return (
      <div className={classes.modalBackdrop}>
        <div className={classes.modal} style={{ width: "400px" }}>
          <h2 className={classes.title}>Fiscal Period Detail</h2>
          <div className={classes.body}>
            <label>
              Open Date:
              <input
                type="date"
                value={this.state.openDate}
                onChange={this.handleInputChange}
                disabled
              />
            </label>
            <label>
              Close Date:
              <input
                type="date"
                value={this.state.closeDate}
                onChange={this.handleInputChange}
                disabled
              />
            </label>
            <label>
              Status:
              <input
                type="text"
                value={this.state.status}
                onChange={this.handleInputChange}
                disabled
              />
            </label>
          </div>
          <div className={classes.modalButtons}>
            <button onClick={this.handleClose} className={classes.cancelBtn}>
              Close
            </button>
            <button
              onClick={this.handleEndPeriod}
              className={
                this.state.status === "opening"
                  ? classes.createBtn
                  : classes.cancelBtn
              }
            >
              End Period
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
)(FicalPeriodDetailModal);
