import React, { Component } from "react";
import classes from "../../css/modules/components/ErrorModal.module.css";
import SaleContext from "../../modules/sale/components/SaleContext";
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "../../modules/sale/containers/SaleMap";

export class ErrorModal extends Component {
  static contextType = SaleContext;
  constructor(props) {
    super(props);

    this.state = {};

    this.oncloseModal = this.oncloseModal.bind(this);
  }

  oncloseModal() {
    this.props.deleteOrderError();
  }

  render() {
    if (!this.props.error) {
      return null;
    }
    return (
      <div className={this.props.error ? classes.modalOverlay : {display: "none"}}>
        <div className={classes.modalBox}>
          <button className={classes.closeBtn} onClick={this.oncloseModal}>
            &times;
          </button>
          <h2 className={classes.modalTitle}>Error</h2>
          <p className={classes.message}>{this.props.error}</p>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorModal);
