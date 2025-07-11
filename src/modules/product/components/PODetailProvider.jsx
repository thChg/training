import React, { Component } from "react";
import { connect } from "react-redux";
// import { exportBillOfLadingToExcel } from "../functions/exportBillOfLadingToExcel";
import {
  mapDispatchToProps,
  mapStateToProps,
} from "../containers/PurchaseOrderMap";
import { withNavigation } from "../../user/functions/withNavigation";

export const PODetailContext = React.createContext();

class PODetailProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      permissions: this.props.permissions.reduce((accumulator, permission) => {
        if (permission.includes("product")) {
          return [...accumulator, permission.split(":")[1].slice(0, -1)];
        }
        return accumulator;
      }, []),
      selectedPO: null,
    };
  }

  async componentDidMount() {
    const { params, purchaseOrderList, fetchPurchaseOrderList } = this.props;

    if (purchaseOrderList.length <= 0) {
      fetchPurchaseOrderList();
    }

    const selectedPO = purchaseOrderList.find((po) => po._id === params.id);
    console.log(selectedPO)
    this.setState({
      selectedPO: selectedPO,
      name: selectedPO.name,
      vendor: selectedPO.vendor.name,
      contact: selectedPO.vendor.contact,
      email: selectedPO.vendor.email,
      taxId: selectedPO.taxId,
      address: selectedPO.address,
      estimatedDeliveryDate: selectedPO.estimatedDeliveryDate,
      curStatus: selectedPO.status,
    });
  }

  render() {
    return (
      <PODetailContext.Provider
        value={{
          ...this.state,
        }}
      >
        {this.props.children}
      </PODetailContext.Provider>
    );
  }
}

const connectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(PODetailProvider);
export default withNavigation(connectedComponent);
