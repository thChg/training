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
    };

    this.handleCancel = this.handleCancel.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
  }
  componentDidMount() {
    const { productList, fetchProductList } = this.props;
    if (productList.length <= 0) {
      fetchProductList();
    }

    this.setState({productList: this.props.productList})
  }

  handleCreate(name, productItems) {
    const { createSaleOrder, productList } = this.props;
    const enrichedProductItems = productItems.map((item) => {
      const prod = productList.find((product) => product._id === item.product);
      return { ...prod, quantity: item.quantity };
    });
    createSaleOrder({ name, products: enrichedProductItems });
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
