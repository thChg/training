import React, { Component } from "react";
import { connect } from "react-redux";
import { exportProductToExcel } from "../functions/exportProductToExcel";
import {
  mapDispatchToProps,
  mapStateToProps,
} from "../containers/PurchaseOrderMap";
import { NavigationWrapper } from "../../../masterPage/components/NavigationWrapper";

export const CreatePOContext = React.createContext();

class CreatePOProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "Create Purchase Order",
      productList: this.props.productList,
      vendorList: this.props.vendorList,
    };

    this.handleCancel = this.handleCancel.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
  }
  componentDidMount() {
    const { productList, fetchProductList, vendorList, fetchVendorList } =
      this.props;
    if (productList.length <= 0) {
      fetchProductList();
    }

    if (vendorList.length <= 0) {
      fetchVendorList();
    }

    this.setState({
      productList: this.props.productList,
      vendorList: this.props.vendorList,
    });
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.productList !== this.props.productList ||
      prevProps.vendorList !== this.props.vendorList
    ) {
      this.setState({
        productList: this.props.productList,
        vendorList: this.props.vendorList,
      });
    }
  }

  handleCreate(data) {
    const { createPurchaseOrder, productList, vendorList } = this.props;
    const enrichedProductItems = data.productItems.map((item) => {
      const prod = productList.find((product) => product._id === item.product);
      return {
        ...prod,
        quantity: item.quantity,
        status: "pending",
        price: item.price,
      };
    });
    const enrichedVendor = vendorList.find(
      (vendor) => vendor._id === data.vendor
    );
    createPurchaseOrder({
      name: data.name,
      vendor: enrichedVendor,
      orderDate: data.orderDate,
      estimatedDeliveryDate: data.estimatedDeliveryDate,
      products: enrichedProductItems,
    });
    this.props.navigate("/purchase-orders");
  }

  handleCancel() {
    this.props.navigate("/purchase-orders");
  }

  render() {
    return (
      <CreatePOContext.Provider
        value={{
          ...this.state,
          handleCancel: this.handleCancel,
          handleCreate: this.handleCreate,
        }}
      >
        {this.props.children}
      </CreatePOContext.Provider>
    );
  }
}

const connectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePOProvider);

export default NavigationWrapper(connectedComponent);
