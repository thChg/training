import React, { Component } from "react";
import { connect } from "react-redux";
import { exportProductToExcel } from "../functions/exportProductToExcel";
import {
  mapDispatchToProps,
  mapStateToProps,
} from "../containers/PurchaseOrderMap";
import { withNavigation } from "../../user/functions/withNavigation";

export const CreatePOContext = React.createContext();

class CreatePOProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "Create Purchase Order",
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
  }

  handleCreate(name, productItems) {
    const { createPurchaseOrder, productList } = this.props;
    const enrichedProductItems = productItems.map((item) => {
      const prod = productList.find((product) => product._id === item.product);
      return { ...prod, quantity: item.quantity };
    });
    createPurchaseOrder({ name, products: enrichedProductItems });
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

export default withNavigation(connectedComponent);
