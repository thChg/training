import React, { Component } from "react";
import classes from "../../css/modules/components/CreateOrderBody.module.css";

export class OrderDetailBody extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.renderProducts = this.renderProducts.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    const { onInputChange } = this.props;
    onInputChange(name, value);
  }

  calculateTotal() {
    const { products } = this.props;
    return products
      .reduce((acc, item) => {
        const qty = parseFloat(item.quantity) || 0;
        const price = parseFloat(item.price) || 0;
        return acc + qty * price;
      }, 0)
      .toFixed(2);
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
          <td style={{padding: "0px"}}>
            
            <input
              className={classes.textInput}
              type="text"
              name="product"
              data-id={product.id}
              value={product.name}
              disabled
            />
          </td>
          <td style={{padding: "0px"}}>
            <input
              className={classes.textInput}
              type="text"
              name="quantity"
              data-id={product.id}
              value={product.quantity}
              disabled
              
            />
          </td>
          <td style={{ backgroundColor: "#eee", textAlign: "center" }}>
            {product.price}
          </td>
          <td style={{ backgroundColor: "#eee", textAlign: "center" }}>
            {product.unit}
          </td>
        </tr>
      );
    });
    return html;
  }

  render() {
    const {
      name,
      orderDate,
      customer,
      contact,
      email,
      estimatedDeliveryDate,
      deliveryAddress,
      approvedAt,
      completedAt,
      isEditing,
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
                  value={name}
                  disabled={!isEditing}
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
                  value={orderDate}
                  min={new Date().toISOString().split("T")[0]}
                  disabled={!isEditing}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className={classes.row}>
            <div className={classes.field}>
              <div className={classes.title}>Customer:</div>
              <div className={classes.head}>
                <input
                  type="text"
                  className={classes.headInput}
                  name="customer"
                  value={customer}
                  disabled
                  onChange={this.handleInputChange}
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
                  value={contact}
                  disabled
                  onChange={this.handleInputChange}
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
                  value={email}
                  disabled
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className={classes.row}>
            <div className={classes.field}>
              <div className={classes.title}>Delivery address:</div>
              <div className={classes.head}>
                <input
                  type="text"
                  className={classes.headInput}
                  name="deliveryAddress"
                  value={deliveryAddress}
                  disabled={!isEditing}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
            <div className={classes.field}>
              <div className={classes.title}>Estimated Delivery Date:</div>
              <div className={classes.head}>
                <input
                  type="date"
                  className={classes.headInput}
                  name="estimatedDeliveryDate"
                  value={estimatedDeliveryDate}
                  disabled={!isEditing}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className={classes.row}>
            <div className={classes.field}>
              <div className={classes.title}>Approved at:</div>
              <div className={classes.head}>
                <input
                  type="date"
                  className={classes.headInput}
                  name="approvedAt"
                  value={approvedAt}
                  disabled={!isEditing}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
            <div className={classes.field}>
              <div className={classes.title}>Completed at:</div>
              <div className={classes.head}>
                <input
                  type="date"
                  className={classes.headInput}
                  name="estimatedDeliveryDate"
                  value={completedAt}
                  disabled={!isEditing}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className={classes.tableContainer} style={{ height: "390px" }}>
            <table>
              <thead>
                <tr>
                  <th>OD</th>
                  <th>Product name</th>
                  <th>Amount</th>
                  <th>Price</th>
                  <th>Unit</th>
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
        </div>
      </div>
    );
  }
}

export default OrderDetailBody;
