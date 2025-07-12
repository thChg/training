import React, { Component } from "react";
import { connect } from "react-redux";
import {
  mapDispatchToProps,
  mapStateToProps,
} from "../containers/POApproveMap";
import { withNavigation } from "../../user/functions/withNavigation";
// import { exportProductToExcel } from "../functions/exportProductToExcel";

export const POApproveDetailContext = React.createContext();

class POApproveDetailProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: `Purchase Order Details`,
      permissions: this.props.permissions.reduce((accumulator, permission) => {
        if (permission.includes("accounting")) {
          return [...accumulator, permission.split(":")[1].slice(0, -1)];
        }
        return accumulator;
      }, []),
      page: "accounting",
      curStatus: "",
      contact: "",
      email: "",
      address: "",
      taxId: "",
      estimatedDeliveryDate: "",
      name: "",
      orderDate: "",
      isEditing: false,
      vendor: "",
      approvedAt: "",
      products: [],
    };
    this.handleResolvePO = this.handleResolvePO.bind(this);
  }

  async componentDidMount() {
    const { params, purchaseOrderList, fetchPurchaseOrderList } = this.props;
    const { id } = params;
    if (purchaseOrderList.length <= 0) {
      fetchPurchaseOrderList();
    }

    const purchaseOrder = this.props.purchaseOrderList.find(
      (po) => po._id === id
    );
    this.setState({
      curStatus: purchaseOrder.status,
      contact: purchaseOrder.vendor.phone,
      email: purchaseOrder.vendor.email,
      address: purchaseOrder.vendor.address,
      taxId: purchaseOrder.vendor.taxId,
      estimatedDeliveryDate: purchaseOrder.estimatedDeliveryDate,
      name: purchaseOrder.name,
      orderDate: purchaseOrder.orderDate,
      vendor: purchaseOrder.vendor.name,
      products: purchaseOrder.products,
      approvedAt: purchaseOrder.approvedAt,
    });
  }

  handleResolvePO(status) {
    const { curStatus } = this.state;
    const id = this.props.params.id;
    if (curStatus !== "pending") {
      return;
    }
    console.log(status);
    this.props.resolvePO({ POId: id, status });
    this.props.navigate("/po-approve");
  }

  render() {
    return (
      <POApproveDetailContext.Provider
        value={{
          ...this.state,
          handleResolvePO: this.handleResolvePO,
        }}
      >
        {this.props.children}
      </POApproveDetailContext.Provider>
    );
  }
}

const connectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(POApproveDetailProvider);
export default withNavigation(connectedComponent);
