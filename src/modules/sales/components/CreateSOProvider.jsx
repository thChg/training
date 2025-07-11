import React, { Component } from "react";
import { connect } from "react-redux";
import {
  mapDispatchToProps,
  mapStateToProps,
} from "../containers/SaleOrderMap";
import { withNavigation } from "../../user/functions/withNavigation";

export const CreateSOContext = React.createContext();

class CreateSOProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "Create Sale Order",
      productList: this.props.productList,
      customerList: this.props.customerList,
    };

    this.handleCancel = this.handleCancel.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
  }
  componentDidMount() {
    const { productList, fetchProductList, customerList, fetchCustomerList } =
      this.props;
    if (productList.length <= 0) {
      fetchProductList();
    }
    if (customerList.length <= 0) {
      fetchCustomerList();
    }

    this.setState({
      productList: this.props.productList,
      customerList: this.props.customerList,
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.productList !== this.props.productList) {
      this.setState({
        productList: this.props.productList,
      });
    }
    if (prevProps.customerList !== this.props.customerList) {
      this.setState({
        customerList: this.props.customerList,
      });
    }
  }

  handleCreate(data) {
    const { createSaleOrder, productList, customerList } = this.props;
    const enrichedProductItems = data.productItems.map((item) => {
      const prod = productList.find((product) => product._id === item.product);
      return { ...prod, quantity: item.quantity, price: item.price };
    });
    const enrichedCustomer = customerList.find(
      (customer) => customer._id === data.customer
    );
    createSaleOrder({
      name: data.name,
      orderDate: data.orderDate,
      customer: enrichedCustomer,
      deliveryAddress: data.deliveryAddress,
      estimatedDeliveryDate: data.estimatedDeliveryDate,
      products: enrichedProductItems,
    });
    this.props.navigate("/sale-orders");
  }

  handleCancel() {
    this.props.navigate("/sale-orders");
  }

  render() {
    return (
      <CreateSOContext.Provider
        value={{
          ...this.state,
          handleCancel: this.handleCancel,
          handleCreate: this.handleCreate,
        }}
      >
        {this.props.children}
      </CreateSOContext.Provider>
    );
  }
}

const connectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateSOProvider);

export default withNavigation(connectedComponent);
