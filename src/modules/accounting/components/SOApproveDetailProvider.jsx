import React, { Component } from "react";
import { connect } from "react-redux";
import {
  mapDispatchToProps,
  mapStateToProps,
} from "../containers/SOApproveMap";
import { withNavigation } from "../../user/functions/withNavigation";
// import { exportProductToExcel } from "../functions/exportProductToExcel";

export const SOApproveDetailContext = React.createContext();

class SOApproveDetailProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      permissions: this.props.permissions.reduce((accumulator, permission) => {
        if (permission.includes("accounting")) {
          return [...accumulator, permission.split(":")[1].slice(0, -1)];
        }
        return accumulator;
      }, []),
      curStatus: "",
      page: "accounting",
      contact: "",
      email: "",
      estimatedDeliveryDate: "",
      name: "",
      orderDate: "",
      isEditing: "",
      customer: "",
      products: "",
      deliveryAddress: "",
      approvedAt: "",
      acceptedAt: "",
      products: [],
    };

    this.handleResolveSO = this.handleResolveSO.bind(this);
  }

  async componentDidMount() {
    const id = this.props.params.id;
    const { saleOrderList, fetchSaleOrderList } = this.props;

    if (saleOrderList.length <= 0) {
      fetchSaleOrderList();
    }
    const saleOrder = this.props.saleOrderList.find((so) => so._id === id);
    this.setState({
      curStatus: saleOrder.status,
      contact: saleOrder.customer.phone,
      email: saleOrder.customer.email,
      estimatedDeliveryDate: saleOrder.estimatedDeliveryDate,
      name: saleOrder.name,
      orderDate: saleOrder.orderDate,
      isEditing: saleOrder.isEditing,
      customer: saleOrder.customer.fullname,
      products: saleOrder.products,
      deliveryAddress: saleOrder.deliveryAddress,
      approvedAt: saleOrder.approvedAt,
      acceptedAt: saleOrder.acceptedAt,
      products: saleOrder.products
    });
  }

  handleResolveSO(status) {
    const { curStatus } = this.state;
    const id = this.props.params.id;
    if (curStatus !== "pending") {
      return;
    }

    this.props.resolveSO({ SOId: id, status });
    this.props.navigate("/so-approve");
  }

  render() {
    return (
      <SOApproveDetailContext.Provider
        value={{
          ...this.state,
          handleResolveSO: this.handleResolveSO,
        }}
      >
        {this.props.children}
      </SOApproveDetailContext.Provider>
    );
  }
}

const connectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(SOApproveDetailProvider);
export default withNavigation(connectedComponent);
