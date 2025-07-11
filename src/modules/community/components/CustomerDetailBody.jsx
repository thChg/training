import React, { Component } from "react";
import classes from "../../../css/modules/components/FunctionBody.module.css";

export class CustomerDetailBody extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.renderOrders = this.renderOrders.bind(this);
  }

  renderOrders() {}

  render() {
    const {email, contact, name} = this.props;
    return (
      <div>
        <div className={classes.body}>
          <div className={classes.row}>
            <div className={classes.field}>
              <div className={classes.title}>Full Name:</div>
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
          </div>
          <div className={classes.title}>Sale Orders</div>
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

export default CustomerDetailBody;
