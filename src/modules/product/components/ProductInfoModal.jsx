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
      isEditing: false,
      name: "",
      price: "",
      unit: "",
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleEditToggle = this.handleEditToggle.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount() {
    const { selectedProduct } = this.context;
    const { name, price, unit } = this.props.productList.find(
      (product) => product._id === selectedProduct
    );
    this.setState({
      name: name,
      price: price,
      unit: unit,
    });
  }
  handleEditToggle() {
    this.setState((prevState) => ({ isEditing: !prevState.isEditing }));
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleClose() {
    this.context.setSelectedProduct(null);
  }

  handleSave() {
    const { name,price,unit } = this.state;
    const { selectedProduct, currentPage, recordPerPage } = this.context;
    const { updateProduct } = this.props;

    const updatingProduct = {
      name,
      price,
      unit,
    };
    updateProduct(selectedProduct, updatingProduct, currentPage, recordPerPage);
    this.setState({ isEditing: false });
}

  render() {
    const { name, price, unit, isEditing } = this.state;

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
            Price
            <input
              className={classes.infoInput}
              name="price"
              value={price}
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

            {isEditing ? (
              <button onClick={this.handleSave} className={classes.saveBtn}>
                Save
              </button>
            ) : (
              <button
                onClick={this.handleEditToggle}
                className={classes.editBtn}
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductInfoModal);
