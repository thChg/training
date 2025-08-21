import React, { Component } from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProp } from "../containers/VendorMap";
import { NavigationWrapper } from "../../../masterPage/components/NavigationWrapper";

export const VendorDetailContext = React.createContext();

export class VendorDetailProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "Vendor Detail",
      email: "",
      name: "",
      contact: "",
      taxId: "",
      address: "",
      purchaseOrders: [],
    };
  }

  async componentDidMount() {
    const {
      recordList,
      fetchRecordList,
      purchaseOrderList,
      fetchPurchaseOrderList,
    } = this.props;
    const { id } = this.props.params;
    if (recordList.length <= 0) {
      await fetchRecordList();
    }
    if (purchaseOrderList.length <= 0) {
      fetchPurchaseOrderList();
    }

    const selectedVendor = this.props.recordList.find(
      (vendor) => vendor._id === id
    );
    const vendorPO = this.props.purchaseOrderList.filter(
      (po) => po.vendor._id === id
    );
    this.setState({
      email: selectedVendor.email,
      name: selectedVendor.name,
      contact: selectedVendor.phone,
      taxId: selectedVendor.taxId,
      address: selectedVendor.address,
      purchaseOrders: vendorPO,
    });
  }

  render() {
    return (
      <VendorDetailContext.Provider
        value={{
          ...this.state,
        }}
      >
        {this.props.children}
      </VendorDetailContext.Provider>
    );
  }
}

const connectedComponent = connect(
  mapStateToProps,
  mapDispatchToProp
)(VendorDetailProvider);

export default NavigationWrapper(connectedComponent);
