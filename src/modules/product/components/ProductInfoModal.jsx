import React, { Component } from "react";
import classes from "../../../css/modules/components/UserInfoModal.module.css";
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "../containers/ProductMap";
import { ProductContext } from "./ProductProvider";

class ProductInfoModal extends Component {
  static contextType = ProductContext;

  constructor(props) {
    super(props);

    this.state = {
      name: "",
      unit: "",
    };

    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    const { selectedProduct } = this.context;
    const { name, unit } = this.props.productList.find(
      (product) => product._id === selectedProduct
    );
    this.setState({
      name: name,
      unit: unit,
    });
  }

  handleClose() {
    this.context.setSelectedProduct(null);
  }

  render() {
    const { name, unit, isEditing } = this.state;

    return (
      <div className={classes.modalBackdrop}>
        <div className={classes.modal}>
          <h2>Product Information</h2>

          <label>
            Name:
            <input
              className={classes.infoInput}
              type="text"
              name="name"
              value={name}
              disabled={!isEditing}
              onChange={this.handleInputChange}
            />
          </label>

          <label>
            Unit:
            <input
              type="text"
              name="unit"
              value={unit}
              disabled={!isEditing}
              onChange={this.handleInputChange}
              className={classes.infoInput}
            />
          </label>

          <div className={classes.modalButtons}>
            <button onClick={this.handleClose} className={classes.cancelBtn}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductInfoModal);
