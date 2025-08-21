import React, { Component } from "react";
import classes from "../../../css/modules/components/CreateOrderBody.module.css";
import { FaPlus } from "react-icons/fa";
import { flatten, isEqual } from "lodash";
import { NavigationWrapper } from "../../../masterPage/components/NavigationWrapper";

export class CreateBOLBody extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      contact: "",
      email: "",
      address: "",
      taxId: "",
      vendor: "",
      vendorPO: [],
      selectedPO: [],
      selectedProducts: [],
      purchaseOrderProducts: [],
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.renderVendorPO = this.renderVendorPO.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
    this.renderProducts = this.renderProducts.bind(this);
    this.handlePOSelect = this.handlePOSelect.bind(this);
    this.handleProductSelect = this.handleProductSelect.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (!isEqual(prevState.selectedPO, this.state.selectedPO)) {
      const { purchaseOrderList } = this.props;

      const purchaseOrderProducts = purchaseOrderList
        .filter((po) => this.state.selectedPO.includes(po._id))
        .flatMap((po) =>
          po.products.map((product) => ({
            ...product,
            poId: po._id,
            poName: po.name,
          }))
        );

      this.setState({ purchaseOrderProducts });
    }
  }

  handleInputChange(event) {
    const { name, value } = event.target;

    if (name === "vendor" && value !== "") {
      const { vendorList, purchaseOrderList } = this.props;
      const vendor = vendorList.find((vendor) => vendor._id === value);
      const vendorPO = purchaseOrderList.filter(
        (po) => po.vendor._id === value && po.status === "approved"
      );

      this.setState({
        contact: vendor.phone,
        taxId: vendor.taxId,
        address: vendor.address,
        email: vendor.email,
        vendorPO: vendorPO,
      });
    }

    this.setState({ [name]: value });
  }

  renderVendorPO() {
    const { purchaseOrderList } = this.props;
    const { vendor, selectedPO } = this.state;
    const vendorPO = purchaseOrderList.filter(
      (po) => po.vendor._id === vendor && po.status === "approved"
    );

    return vendorPO.map((po, index) => (
      <tr>
        <td className={classes.tableData} style={{ textAlign: "center" }}>
          {index + 1}
        </td>
        <td className={classes.tableData} style={{ textAlign: "center" }}>
          <input
            type="checkbox"
            value={po._id}
            name="selectedPO"
            onChange={this.handlePOSelect}
            checked={selectedPO.includes(po._id)}
          />
        </td>
        <td className={classes.tableData}>{po.name}</td>
        <td className={classes.tableData}>{po.orderDate}</td>
        <td className={classes.tableData}>{po.estimatedDeliveryDate}</td>
        <td className={classes.tableData}>{po.approvedAt}</td>
        <td className={classes.tableData}>{po.status}</td>
      </tr>
    ));
  }

  handlePOSelect(event) {
    const { purchaseOrderList } = this.props;
    const { vendor } = this.state;
    const { checked, value } = event.target;
    const { header } = event.currentTarget.dataset;

    this.setState({ selectedProducts: [] });

    const vendorPO = purchaseOrderList.filter(
      (po) => po.vendor._id === vendor && po.status === "approved"
    );
    if (header == "true") {
      this.setState(() => {
        if (!checked) {
          {
            return { selectedPO: [] };
          }
        } else {
          return { selectedPO: vendorPO.map((po) => po._id) };
        }
      });
    } else {
      const po = purchaseOrderList.find((po) => po._id === value);
      this.setState((prevState) => {
        if (prevState.selectedPO.includes(po._id)) {
          return {
            selectedPO: prevState.selectedPO.filter(
              (element) => element !== po._id
            ),
          };
        }
        return {
          selectedPO: [...prevState.selectedPO, po._id],
        };
      });
    }
  }

  calculateTotal() {
    const { selectedProducts, purchaseOrderProducts } = this.state;

    const selected = purchaseOrderProducts.filter((product) =>
      selectedProducts.some(
        (p) => p.poId === product.poId && p.productId === product._id
      )
    );

    return selected
      .reduce((acc, item) => {
        const qty = parseFloat(item.quantity) || 0;
        const price = parseFloat(item.price) || 0;
        return acc + qty * price;
      }, 0)
      .toFixed(2);
  }
  renderProducts() {
    const { selectedPO } = this.state;
    const { purchaseOrderList } = this.props;

    const products = purchaseOrderList
      .filter((po) => selectedPO.includes(po._id))
      .flatMap((po) =>
        po.products.map((product) => ({
          ...product,
          poId: po._id,
          poName: po.name,
        }))
      );

    return products.map((product, index) => (
      <tr>
        <td style={{ textAlign: "center" }}>{index + 1}</td>
        <td style={{ textAlign: "center" }}>
          <input
            type="checkbox"
            onChange={this.handleProductSelect}
            checked={this.state.selectedProducts.some(
              (p) => p.poId === product.poId && p.productId === product._id
            )}
            value={JSON.stringify({
              poId: product.poId,
              productId: product._id,
            })}
            name="selectedProducts"
          />
        </td>
        <td className={classes.tableData}>{product.poName}</td>
        <td className={classes.tableData}>{product.name}</td>
        <td className={classes.tableData}>{product.quantity}</td>
        <td className={classes.tableData}>{product.unit}</td>
        <td className={classes.tableData}>{product.price}</td>
        <td className={classes.tableData}>{product.status}</td>
      </tr>
    ));
  }

  handleProductSelect(event) {
    const { checked } = event.target;
    const { header } = event.currentTarget.dataset;
    const { purchaseOrderList } = this.props;
    const { selectedPO } = this.state;

    if (header == "true") {
      const allProducts = purchaseOrderList
        .filter((po) => selectedPO.includes(po._id))
        .flatMap((po) =>
          po.products.map((product) => ({
            poId: po._id,
            productId: product._id,
          }))
        );

      this.setState({
        selectedProducts: checked ? allProducts : [],
      });
    } else {
      const { poId, productId } = JSON.parse(event.target.value);
      const key = (item) => `${item.poId}-${item.productId}`;

      const newProduct = { poId, productId };

      this.setState((prevState) => {
        const exists = prevState.selectedProducts.some(
          (item) => item.poId === poId && item.productId === productId
        );

        return {
          selectedProducts: exists
            ? prevState.selectedProducts.filter(
                (item) => key(item) !== key(newProduct)
              )
            : [...prevState.selectedProducts, newProduct],
        };
      });
    }
  }

  handleCreate() {
    const { name, vendor, selectedProducts } = this.state;
    const { vendorList, purchaseOrderList } = this.props;

    const vendorData = vendorList.find((v) => v._id === vendor);
    const enrichedProducts = selectedProducts
      .map((p) => {
        const po = purchaseOrderList.find((po) => po._id === p.poId);
        if (!po) return null;

        const product = po.products.find((prod) => prod._id === p.productId);
        if (!product) return null;

        return {
          ...product,
          purchaseOrder: {
            _id: po._id,
            name: po.name,
            orderDate: po.orderDate,
            estimatedDeliveryDate: po.estimatedDeliveryDate,
            approvedAt: po.approvedAt,
          },
        };
      })
      .filter(Boolean);

    this.props.onCreate({
      name,
      vendor: vendorData,
      products: enrichedProducts,
    });
  }

  handleCancel() {
    this.props.onCancel();
  }

  render() {
    const { vendorList } = this.props;
    const { name, contact, email, address, taxId, vendor } = this.state;
    return (
      <div>
        <div className={classes.body}>
          <div className={classes.row}>
            <div className={classes.field}>
              <div className={classes.title}>Bill Of Lading Name:</div>
              <div className={classes.head}>
                <input
                  type="text"
                  className={classes.headInput}
                  name="name"
                  onChange={this.handleInputChange}
                  value={name}
                />
              </div>
            </div>
            <div className={classes.field}>
              <div className={classes.title}>Vendor:</div>
              <div className={classes.head}>
                <select
                  name="vendor"
                  onChange={this.handleInputChange}
                  value={vendor}
                  className={classes.headSelect}
                >
                  <option value="">Select a vendor</option>
                  {vendorList.map((vendor) => (
                    <option value={vendor._id}>{vendor.name}</option>
                  ))}
                </select>
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
            Purchase Orders from Vendor:
          </div>
          <div className={classes.tableContainer}>
            <table>
              <thead>
                <tr>
                  <th>OD</th>
                  <th>
                    <input
                      type="checkbox"
                      onChange={this.handlePOSelect}
                      data-header="true"
                      name="selectedPO"
                    />
                  </th>
                  <th>PO name</th>
                  <th>Order Date</th>
                  <th>Estimated Delivery Date</th>
                  <th>Approved At</th>
                  <th>Status</th>
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
                  <th>
                    <input
                      type="checkbox"
                      onChange={this.handleProductSelect}
                      data-header="true"
                    />
                  </th>
                  <th>PO name</th>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Unit</th>
                  <th>Price</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>{this.renderProducts()}</tbody>
              <tfoot>
                <tr className={classes.stickyFooter}>
                  <td
                    colSpan="6"
                    style={{
                      textAlign: "right",
                      fontWeight: "bold",
                      padding: "5px",
                    }}
                  >
                    Total:
                  </td>
                  <td colSpan="2">{this.calculateTotal()}</td>
                </tr>
              </tfoot>
            </table>
          </div>
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

export default NavigationWrapper(CreateBOLBody);
