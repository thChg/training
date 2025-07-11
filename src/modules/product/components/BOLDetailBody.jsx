import React, { Component } from "react";
import classes from "../../../css/modules/components/CreateOrderBody.module.css";

export class BOLDetailBody extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.renderVendorPO = this.renderVendorPO.bind(this);
    this.renderProducts = this.renderProducts.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
  }

  renderVendorPO() {
    const { purchaseOrders } = this.props;

    return purchaseOrders.map((po, index) => (
      <tr>
        <td className={classes.tableData} style={{ textAlign: "center" }}>
          {index + 1}
        </td>
        <td className={classes.tableData}>{po.name}</td>
        <td className={classes.tableData}>{po.orderDate}</td>
        <td className={classes.tableData}>{po.estimatedDeliveryDate}</td>
        <td className={classes.tableData}>{po.approvedAt}</td>
      </tr>
    ));
  }

  renderProducts() {
    const { products } = this.props;

    return products.map((product, index) => (
      <tr>
        <td style={{ textAlign: "center" }}>{index + 1}</td>
        <td className={classes.tableData}>{product.purchaseOrder.name}</td>
        <td className={classes.tableData}>{product.name}</td>
        <td className={classes.tableData}>{product.quantity}</td>
        <td className={classes.tableData}>{product.unit}</td>
        <td className={classes.tableData}>{product.price}</td>
      </tr>
    ));
  }

  calculateTotal() {
    const { products } = this.props;

    const total = products.reduce(
      (acc, p) => (acc += parseInt(p.price) * parseInt(p.quantity)),
      0
    );
    return total.toFixed(2);
  }

  render() {
    const { name, vendor, contact, email, address, taxId } = this.props;
    return (
      <div>
        <div className={classes.body} style={{ maxHeight: "700px" }}>
          <div className={classes.row}>
            <div className={classes.field}>
              <div className={classes.title}>Bill Of Lading Name:</div>
              <div className={classes.head}>
                <input
                  type="text"
                  className={classes.headInput}
                  name="name"
                  value={name}
                  disabled
                />
              </div>
            </div>
            <div className={classes.field}>
              <div className={classes.title}>Vendor:</div>
              <div className={classes.head}>
                <input
                  type="text"
                  name="vendor"
                  onChange={this.handleInputChange}
                  value={vendor}
                  className={classes.headSelect}
                  disabled
                ></input>
              </div>
            </div>
          </div>
          <div className={classes.row}>
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
          <div className={classes.title} style={{ marginTop: "10px" }}>
            Purchase Orders:
          </div>
          <div className={classes.tableContainer}>
            <table>
              <thead>
                <tr>
                  <th>OD</th>
                  <th>PO name</th>
                  <th>Order Date</th>
                  <th>Estimated Delivery Date</th>
                  <th>Approved At</th>
                </tr>
              </thead>
              <tbody>{this.renderVendorPO()}</tbody>
            </table>
          </div>
          <div className={classes.title} style={{ marginTop: "15px" }}>
            Products:
          </div>
          <div className={classes.tableContainer}>
            <table>
              <thead>
                <tr>
                  <th>OD</th>
                  <th>PO name</th>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Unit</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>{this.renderProducts()}</tbody>
              <tfoot>
                <tr className={classes.stickyFooter}>
                  <td
                    colSpan="5"
                    style={{
                      textAlign: "right",
                      fontWeight: "bold",
                      padding: "5px",
                    }}
                  >
                    Total:
                  </td>
                  <td colSpan="1">{this.calculateTotal()}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default BOLDetailBody;
