import React, { Component } from "react";
import classes from "../../../css/modules/components/CreateOrderBody.module.css";
import { FaMinus, FaPlus } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import { max, min } from "lodash";

export class CreatePurchaseOrderBody extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      orderDate: "",
      vendor: "",
      contact: "",
      email: "",
      address: "",
      taxId: "",
      estimatedDeliveryDate: "",
      productItems: [],
    };

    this.renderProducts = this.renderProducts.bind(this);
    this.onAddProduct = this.onAddProduct.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRemoveProduct = this.handleRemoveProduct.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
  }

  onAddProduct() {
    this.setState((prevState) => ({
      productItems: [
        ...prevState.productItems,
        {
          od: prevState.productItems.length + 1,
          id: uuidv4(),
          product: "",
          quantity: "",
          price: "",
          unit: "",
        },
      ],
    }));
  }
  handleInputChange(event) {
    const { name, value } = event.target;
    const id = event.currentTarget.dataset.id;
    const { vendorList } = this.props;
    if (!id) {
      this.setState({ [name]: value });
      if (name === "vendor") {
        const vendorData = vendorList.find((vendor) => vendor._id === value);
        this.setState({
          venodr: value,
          contact: vendorData.phone,
          email: vendorData.email,
          address: vendorData.address,
          taxId: vendorData.taxId,
        });
      }
      return;
    }

    this.setState((prevState) => {
      const productItems = prevState.productItems.map((item) => {
        if (item.id === id) {
          if (name === "product") {
            const selectedProduct = this.props.productList.find(
              (p) => p._id === value
            );
            return {
              ...item,
              product: value,
              unit: selectedProduct?.unit || "",
            };
          } else if (name === "price") {
            return {
              ...item,
              price: value,
            };
          }
          return { ...item, [name]: value };
        }
        return item;
      });

      return { productItems };
    });
  }

  calculateTotal() {
    const { productItems } = this.state;
    return productItems
      .reduce((acc, item) => {
        const qty = parseFloat(item.quantity) || 0;
        const price = parseFloat(item.price) || 0;
        return acc + qty * price;
      }, 0)
      .toFixed(2);
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
        <tr>
          <td style={{ fontSize: "small", textAlign: "center" }}>
            {product.od}
          </td>
          <td>
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
          </td>
          <td>
            <input
              className={classes.textInput}
              type="text"
              onChange={this.handleInputChange}
              name="quantity"
              data-id={product.id}
              value={product.quantity}
            />
          </td>
          <td>
            <input
              className={classes.textInput}
              type="text"
              onChange={this.handleInputChange}
              name="price"
              data-id={product.id}
              value={product.price}
            />
          </td>
          <td style={{ backgroundColor: "#eee", textAlign: "center" }}>
            {product.unit}
          </td>
          <td style={{ textAlign: "center" }}>
            <button
              className={classes.deleteBtn}
              data-id={product.id}
              onClick={this.handleRemoveProduct}
            >
              <FaMinus className={classes.icon} />
            </button>
          </td>
        </tr>
      );
    });
    return html;
  }

  handleCreate() {
    const {
      name,
      orderDate,
      vendor,
      address,
      taxId,
      contact,
      email,
      estimatedDeliveryDate,
      productItems,
    } = this.state;
    const { onCreate } = this.props;
    if (
      name === "" ||
      orderDate === "" ||
      vendor === "" ||
      contact === "" ||
      email === "" ||
      estimatedDeliveryDate === "" ||
      address === "" ||
      taxId === ""
    ) {
      alert("Fill all fields!");
      return;
    }
    if (productItems.length === 0) {
      alert("Please include at least one product");
      return;
    }

    onCreate({
      name,
      orderDate,
      vendor,
      address,
      taxId,
      contact,
      email,
      estimatedDeliveryDate,
      productItems,
    });
  }

  handleCancel() {
    this.props.onCancel();
  }

  render() {
    const { vendorList } = this.props;
    const { contact, email, address, taxId } = this.state;
    return (
      <div>
        <div className={classes.body}>
          <div className={classes.row}>
            <div className={classes.field}>
              <div className={classes.title}>Order Name:</div>
              <div className={classes.head}>
                <input
                  type="text"
                  className={classes.headInput}
                  name="name"
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
            <div className={classes.field}>
              <div className={classes.title}>Order date:</div>
              <div className={classes.head}>
                <input
                  type="date"
                  className={classes.headInput}
                  name="orderDate"
                  onChange={this.handleInputChange}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>
          </div>
          <div className={classes.row}>
            <div className={classes.field}>
              <div className={classes.title}>Vendor:</div>
              <div className={classes.head}>
                <select
                  name="vendor"
                  onChange={this.handleInputChange}
                  className={classes.headSelect}
                >
                  <option value="">Select a vendor</option>
                  {vendorList.map((vendor) => (
                    <option value={vendor._id}>{vendor.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className={classes.field}>
              <div className={classes.title}>Contact:</div>
              <div className={classes.head}>
                <input
                  type="text"
                  className={classes.headInput}
                  name="contact"
                  onChange={this.handleInputChange}
                  value={contact}
                  disabled
                />
              </div>
            </div>
            <div className={classes.field}>
              <div className={classes.title}>Email:</div>
              <div className={classes.head}>
                <input
                  type="email"
                  className={classes.headInput}
                  name="email"
                  onChange={this.handleInputChange}
                  value={email}
                  disabled
                />
              </div>
            </div>
          </div>
          <div className={classes.row}>
            <div className={classes.field}>
              <div className={classes.title}>Estimated Delivery Date:</div>
              <div className={classes.head}>
                <input
                  type="date"
                  className={classes.headInput}
                  name="estimatedDeliveryDate"
                  onChange={this.handleInputChange}
                  min={max([
                    new Date().toISOString().split("T")[0],
                    this.state.orderDate,
                  ])}
                />
              </div>
            </div>
            <div className={classes.field}>
              <div className={classes.title}>Address:</div>
              <div className={classes.head}>
                <input
                  type="text"
                  className={classes.headInput}
                  name="address"
                  onChange={this.handleInputChange}
                  value={address}
                  disabled
                />
              </div>
            </div>
            <div className={classes.field}>
              <div className={classes.title}>Tax ID:</div>
              <div className={classes.head}>
                <input
                  type="text"
                  className={classes.headInput}
                  name="taxId"
                  onChange={this.handleInputChange}
                  value={taxId}
                  disabled
                />
              </div>
            </div>
          </div>
          <div className={classes.tableContainer}>
            <table>
              <thead>
                <tr>
                  <th>OD</th>
                  <th>Product name</th>
                  <th>Amount</th>
                  <th>Price</th>
                  <th>Unit</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>{this.renderProducts()}</tbody>
              <tfoot>
                <tr className={classes.stickyFooter}>
                  <td
                    colSpan="3"
                    style={{
                      textAlign: "right",
                      fontWeight: "bold",
                      padding: "5px",
                    }}
                  >
                    Total:
                  </td>
                  <td colSpan="3">{this.calculateTotal()}</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <button className={classes.addBtn} onClick={this.onAddProduct}>
            <FaPlus className={classes.icon} />
          </button>
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

export default CreatePurchaseOrderBody;
