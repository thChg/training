import React, { Component } from "react";
import classes from "../../../css/modules/components/CreateModal.module.css";
import { BillOfLadingContext } from "./BillOfLadingProvider";
import { connect } from "react-redux";
import {
  mapDispatchToProps,
  mapStateToProps,
} from "../containers/BillOfLadingMap";

export class CreateBillOfLadingModal extends Component {
  static contextType = BillOfLadingContext;
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      purchaseOrderItems: [],
    };

    this.onCreate = this.onCreate.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderProducts = this.renderProducts.bind(this);
    this.onAddProduct = this.onAddProduct.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  onAddProduct() {
    this.setState((prevState) => ({
      purchaseOrderItems: [
        ...prevState.purchaseOrderItems,
        { purchaseOrder: "", product: "" },
      ],
    }));
  }

  handleSelect(event) {
    const index = event.currentTarget.dataset.index;
    const { name, value } = event.target;
    const { purchaseOrderItems } = this.state;

    const res = [...purchaseOrderItems];
    res[index] = { ...purchaseOrderItems[index], [name]: value };
    this.setState({
      purchaseOrderItems: res,
    });
  }
  renderProducts() {
    const { purchaseOrderItems } = this.state;
    const { pendingPurchaseOrderList } = this.context;

    let html = [];
    for (let i = 0; i < purchaseOrderItems.length; i++) {
      html.push(
        <div style={{ display: "flex", gap: "10px" }} key={purchaseOrderItems[i]._id}>
          <label style={{ flex: 0.5 }}>
            Purchase Order:
            <select
              name="purchaseOrder"
              data-index={i}
              onChange={this.handleSelect}
              value={purchaseOrderItems[i].purchaseOrder}
            >
              <option value="">Select an order</option>
              {pendingPurchaseOrderList.map((item) => (
                <option value={item._id}>{item.name}</option>
              ))}
            </select>
          </label>
          <label style={{ flex: 0.5 }}>
            Product
            <select
              name="product"
              data-index={i}
              onChange={this.handleSelect}
              value={purchaseOrderItems[i].product}
            >
              <option value="">select a product</option>
              {pendingPurchaseOrderList
                .find((PO) => PO._id === purchaseOrderItems[i].purchaseOrder)
                ?.products.map((product) => (
                  <option value={product._id}>{product.name}</option>
                ))}
            </select>
          </label>
        </div>
      );
    }
    return html;
  }

  onCreate() {
    const { name, purchaseOrderItems } = this.state;
    const { currentPage, recordPerPage, toggleCreateModalVisible } =
      this.context;

    if (name === "") {
      alert("Fill in all neccessary fields!");
      return;
    }
    this.props.createBillOfLading(
      { name, purchaseOrderItems },
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
          <div className={classes.title}>Create new Bill of Lading</div>
          <div className={classes.body}>
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
)(CreateBillOfLadingModal);
