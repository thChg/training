import React, { Component } from "react";
import classes from "../../../css/modules/components/FunctionBody.module.css";

export class VendorDetailBody extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.renderOrders = this.renderOrders.bind(this);
  }

  calculateTotal(products) {
    return products
      .reduce((acc, p) => (acc += p.price * p.quantity), 0)
      .toFixed(2);
  }

  renderOrders() {
    const { purchaseOrders } = this.props;
    console.log(purchaseOrders)
    return purchaseOrders.map((po, index) => (
      <tr>
        <td className={classes.tableData}>{index + 1}</td>
        <td className={classes.tableData}>{po.name}</td>
        <td className={classes.tableData}>{po.orderDate}</td>
        <td className={classes.tableData}>
          {this.calculateTotal(po.products)}
        </td>
        <td className={classes.tableData}>{po.status}</td>
      </tr>
    ));
  }

  render() {
    const { name, address, email, contact, taxId } = this.props;
    return (
      <div>
        <div className={classes.body}>
          <div className={classes.row}>
            <div className={classes.field}>
              <div className={classes.title}>Vendor Name:</div>
              <div className={classes.head}>
                <input
                  type="text"
                  className={classes.headInput}
                  name="name"
                  value={name}
                />
              </div>
            </div>
            <div className={classes.field}>
              <div className={classes.title}>Address:</div>
              <div className={classes.head}>
                <input
                  type="text"
                  className={classes.headInput}
                  name="name"
                  value={address}
                />
              </div>
            </div>
          </div>
          <div className={classes.row}>
            <div className={classes.field}>
              <div className={classes.title}>Email:</div>
              <div className={classes.head}>
                <input
                  type="text"
                  className={classes.headInput}
                  name="name"
                  value={email}
                />
              </div>
            </div>
            <div className={classes.field}>
              <div className={classes.title}>Contact:</div>
              <div className={classes.head}>
                <input
                  type="text"
                  className={classes.headInput}
                  name="name"
                  value={contact}
                />
              </div>
            </div>
            <div className={classes.field}>
              <div className={classes.title}>Tax ID:</div>
              <div className={classes.head}>
                <input
                  type="text"
                  className={classes.headInput}
                  name="name"
                  value={taxId}
                />
              </div>
            </div>
          </div>
          <div className={classes.title}>Purchase Orders</div>
          <div className={classes.tableContainer} style={{ height: "390px" }}>
            <table>
              <thead>
                <tr>
                  <th>OD</th>
                  <th>Order Name</th>
                  <th>Order Date</th>
                  <th>Total Price</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>{this.renderOrders()}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default VendorDetailBody;
