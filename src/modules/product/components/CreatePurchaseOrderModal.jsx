import React, { Component } from "react";
import classes from "../../../css/modules/components/CreateModal.module.css";
import { PurchaseOrderContext } from "./PurchaseOrderProvider";
import { connect } from "react-redux";
import {
  mapDispatchToProps,
  mapStateToProps,
} from "../containers/PurchaseOrderMap";

export class CreatePurchaseOrderModal extends Component {
  static contextType = PurchaseOrderContext;
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      productItems: [],
    };

    this.onCreate = this.onCreate.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderProducts = this.renderProducts.bind(this);
    this.onAddProduct = this.onAddProduct.bind(this);
  }

  onAddProduct() {
    this.setState((prevState) => ({
      productQuantity: prevState.productQuantity + 1,

      productItems: [
        ...prevState.productItems,
        { productName: "", quantity: "", unit: "" },
      ],
    }));
  }

  renderProducts() {
    const { productItems } = this.state;
    let html = [];
    for (let i = 0; i < productItems.length; i++) {
      html.push(
        <div style={{ display: "flex", gap: "10px" }}>
          <label style={{ flex: 0.65 }}>
            Product name:
            <input
              type="text"
              onChange={this.handleInputChange}
              name="productName"
              data-index={i}
            />
          </label>
          <label style={{ flex: 0.2 }}>
            Quantity:
            <input
              type="text"
              onChange={this.handleInputChange}
              name="quantity"
              data-index={i}
            />
          </label>
          <label style={{ flex: 0.3 }}>
            Unit:
            <input
              type="text"
              onChange={this.handleInputChange}
              name="unit"
              data-index={i}
            />
          </label>
        </div>
      );
    }
    return html;
  }

  onCreate() {
    const { name, productItems } = this.state;
    const { currentPage, recordPerPage, toggleCreateModalVisible } =
      this.context;

    if (name === "") {
      alert("Fill in all neccessary fields!");
      return;
    }
    this.props.createPurchaseOrder(
      { name, productItems },
      currentPage,
      recordPerPage
    );

    toggleCreateModalVisible();
  }

  handleInputChange(event) {
    const { value, name } = event.target;

    if (name === "name") {
      this.setState({ name: value });
      return;
    }

    const index = parseInt(event.currentTarget.dataset.index);
    this.setState((prevState) => {
      const productItems = [...prevState.productItems];
      productItems[index] = {
        ...productItems[index],
        [name]: value,
      };

      return { productItems };
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { currentPage, recordPerPage, toggleCreateModalVisible } =
      this.context;
    const file = event.target.querySelector('input[type="file"]').files[0];
    if (!file) {
      alert("Specify a .xlsx file");
      return;
    }
    this.props.importProductFromFile(file, currentPage, recordPerPage);
    toggleCreateModalVisible();
  }

  render() {
    const { toggleCreateModalVisible } = this.context;
    return (
      <div className={classes.modalBackdrop}>
        <div className={classes.modal}>
          <div className={classes.title}>Create new Product order</div>
          <div className={classes.body}>
            {/* <div>
              <label>Import from xlsx file:</label>
              <form className={classes.fileUpload} onSubmit={this.handleSubmit}>
                <input type="file" accept=".xlsx,.xls" />
                <button className={classes.submitBtn} type="submit">
                  Submit
                </button>
              </form>
            </div> */}
            <label>
              Name:
              <input
                type="text"
                onChange={this.handleInputChange}
                name="name"
              />
            </label>
            <button
              className={classes.createBtn}
              onClick={this.onAddProduct}
              style={{ marginBottom: "10px" }}
            >
              Add Product
            </button>
            {this.renderProducts()}
            <div className={classes.modalButtons}>
              <button
                className={classes.cancelBtn}
                onClick={toggleCreateModalVisible}
              >
                Cancel
              </button>
              <button className={classes.createBtn} onClick={this.onCreate}>
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePurchaseOrderModal);
