import React, { Component } from "react";
import classes from "../../css/modules/components/CreateOrderBody.module.css";
import { FaMinus, FaPlus } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

export class CreatePOBody extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      productItems: [],
    };

    this.renderProducts = this.renderProducts.bind(this);
    this.onAddProduct = this.onAddProduct.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRemoveProduct = this.handleRemoveProduct.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleCreate =this.handleCreate.bind(this);
  }

  onAddProduct() {
    this.setState((prevState) => ({
      productItems: [
        ...prevState.productItems,
        { id: uuidv4(), product: "", quantity: "" },
      ],
    }));
  }
  handleInputChange(event) {
    const { value, name } = event.target;

    if (name === "name") {
      this.setState({ name: value });
      return;
    }

    const id = event.currentTarget.dataset.id;

    this.setState((prevState) => {
      const productItems = prevState.productItems.map((item) =>
        item.id === id ? { ...item, [name]: value } : item
      );

      return { productItems };
    });
  }

  handleRemoveProduct(event) {
    const id = event.currentTarget.dataset.id;
    const { productItems } = this.state;
    const removedProductItems = productItems.filter(
      (productItem) => productItem.id !== id
    );

    this.setState({ productItems: removedProductItems });
  }

  renderProducts() {
    const { productItems } = this.state;
    const { productList } = this.props;
    let html = [];
    productItems.forEach((product) => {
      html.push(
        <div style={{ display: "flex", gap: "10px" }}>
          <div style={{ display: "flex", gap: "10px", flex: 0.97 }}>
            <label style={{ flex: 0.8 }}>
              Product name:
              <select
                className={classes.textInput}
                type="text"
                onChange={this.handleInputChange}
                name="product"
                data-id={product.id}
                value={product.product}
              >
                <option value="">Select a product</option>
                {productList.map((product) => (
                  <option value={product._id}>{product.name}</option>
                ))}
              </select>
            </label>
            <label style={{ flex: 0.2 }}>
              Quantity:
              <input
                className={classes.textInput}
                type="text"
                onChange={this.handleInputChange}
                name="quantity"
                data-id={product.id}
                value={product.quantity}
              />
            </label>
          </div>
          <button
            className={classes.deleteBtn}
            style={{ flex: 0.03 }}
            data-id={product.id}
            onClick={this.handleRemoveProduct}
          >
            <FaMinus className={classes.icon} />
          </button>
        </div>
      );
    });
    return html;
  }

  handleCreate() {
    const { name, productItems } = this.state;
    const {onCreate} = this.props;
    if (name.trim() === "") {
      alert("Purchase Order Name cannot be empty");
      return;
    }
    if (productItems.length === 0) {
      alert("Please include at least one product");
      return;
    }

    onCreate(name, productItems)
  }

  handleCancel() {
    this.props.onCancel();
  }

  render() {
    return (
      <div>
        <div className={classes.body}>
          <div className={classes.title}>Order Name:</div>
          <div className={classes.head}>
            <input
              type="text"
              className={classes.headInput}
              style={{ flex: 0.97 }}
              name="name"
              onChange={this.handleInputChange}
            />
            <button
              className={classes.createBtn}
              style={{ flex: 0.03 }}
              onClick={this.onAddProduct}
            >
              <FaPlus className={classes.icon} />
            </button>
          </div>
          <div>{this.renderProducts()}</div>
        </div>
        <div className={classes.buttonBar}>
          <button className={classes.cancelBtn} onClick={this.handleCancel}>
            Cancel
          </button>
          <button className={classes.createBtn} onClick={this.handleCreate}>
            Create
          </button>
        </div>
      </div>
    );
  }
}

export default CreatePOBody;
