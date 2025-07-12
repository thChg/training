import React, { Component } from "react";
import classes from "../../../css/modules/components/CreateOrderBody.module.css";
import { FaMinus, FaPlus } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import { max, min } from "lodash";

export class PurchaseOrderDetailBody extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.handleInputChange = this.handleInputChange.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
  }

  renderProducts() {
    const { products } = this.props;
    let html = [];
    products.forEach((product, index) => {
      html.push(
        <tr>
          <td style={{ fontSize: "small", textAlign: "center" }}>
            {index + 1}
          </td>
          <td style={{ padding: "0px" }}>
            <input
              className={classes.textInput}
              type="text"
              onChange={this.handleInputChange}
              name="product"
              data-id={product.id}
              value={product.name}
              disabled
            ></input>
          </td>
          <td style={{ backgroundColor: "#eee", textAlign: "center" }}>
            {product.unit}
          </td>
          <td style={{ padding: "0px" }}>
            <input
              className={classes.textInput}
              type="text"
              onChange={this.handleInputChange}
              name="quantity"
              data-id={product.id}
              value={product.quantity}
              disabled
            />
          </td>
          <td style={{ padding: "0px" }}>
            <input
              className={classes.textInput}
              type="text"
              onChange={this.handleInputChange}
              name="price"
              data-id={product.id}
              value={product.price}
              disabled
            />
          </td>
        </tr>
      );
    });
    return html;
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this.props.onInputChange(name, value);
  }

  calculateTotal() {
    const {products} = this.props;

    return products.reduce((acc, p) => acc += p.price * p.quantity,0).toFixed(2)
  }

  render() {
    const {
      contact,
      email,
      address,
      taxId,
      estimatedDeliveryDate,
      name,
      orderDate,
      isEditing,
      vendor,
      approvedAt
    } = this.props;
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
                  value={name}
                  disabled={!isEditing}
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
                  value={orderDate}
                  disabled={!isEditing}
                />
              </div>
            </div>
            <div className={classes.field}>
              <div className={classes.title}>Aprroved At:</div>
              <div className={classes.head}>
                <input
                  type="date"
                  className={classes.headInput}
                  name="approvedAt"
                  value={approvedAt}
                  disabled
                />
              </div>
            </div>
          </div>
          <div className={classes.row}>
            <div className={classes.field}>
              <div className={classes.title}>Vendor:</div>
              <div className={classes.head}>
                <input
                  name="vendor"
                  onChange={this.handleInputChange}
                  className={classes.headSelect}
                  value={vendor}
                  disabled
                />                

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
                    this.props.orderDate,
                  ])}
                  value={estimatedDeliveryDate}
                  disabled={!isEditing}
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
                  <th>Unit</th>
                  <th>Amount</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>{this.renderProducts()}</tbody>
              <tfoot>
                <tr className={classes.stickyFooter}>
                  <td
                    colSpan="4"
                    style={{
                      textAlign: "right",
                      fontWeight: "bold",
                      padding: "5px",
                    }}
                  >
                    Total:
                  </td>
                  <td >{this.calculateTotal()}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default PurchaseOrderDetailBody;
