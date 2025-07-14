import React, { Component } from "react";
import classes from "../../../css/modules/components/CreateOrderBody.module.css";
import { max } from "lodash";

export class InventorySummaryBody extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.renderProducts = this.renderProducts.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  renderProducts() {
    const { inventorySummary } = this.props;
    let html = [];
    inventorySummary.forEach((product, index) => {
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
              value={product.importQty}
              disabled
              style={{ textAlign: "center" }}
            />
          </td>
          <td style={{ padding: "0px" }}>
            <input
              className={classes.textInput}
              type="text"
              onChange={this.handleInputChange}
              name="price"
              data-id={product.id}
              value={product.importAvgPrice}
              disabled
              style={{ textAlign: "center" }}
            />
          </td>
          <td style={{ padding: "0px" }}>
            <input
              className={classes.textInput}
              type="text"
              onChange={this.handleInputChange}
              name="price"
              data-id={product.id}
              value={product.exportQty}
              disabled
              style={{ textAlign: "center" }}
            />
          </td>
          <td style={{ padding: "0px"}}>
            <input
            style={{ textAlign: "center" }}
              className={classes.textInput}
              type="text"
              onChange={this.handleInputChange}
              name="price"
              data-id={product.id}
              value={product.exportAvgPrice}
              disabled
            />
          </td>
        </tr>
      );
    });
    return html;
  }

  handleInputChange(event) {}

  render() {
    console.log(this.props.inventorySummary)
    return (
      <div>
        <div className={classes.body} style={{overflowY: "auto"}}>
          <div className={classes.tableContainer} style={{height: "calc(100vh - 200px)"}}>
            <table>
              <thead>
                <tr>
                  <th>OD</th>
                  <th>Product name</th>
                  <th>Unit</th>
                  <th>Import Quantity</th>
                  <th>Import Avg. Price</th>
                  <th>Export Quantity</th>
                  <th>Export Avg. Price</th>
                </tr>
              </thead>
              <tbody>{this.renderProducts()}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default InventorySummaryBody;
