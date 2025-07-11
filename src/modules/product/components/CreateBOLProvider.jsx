import React, { Component } from "react";
import { connect } from "react-redux";
import { exportProductToExcel } from "../functions/exportProductToExcel";
import {
  mapDispatchToProps,
  mapStateToProps,
} from "../containers/BillOfLadingMap";
import { withNavigation } from "../../user/functions/withNavigation";

export const CreateBOLContext = React.createContext();

class CreateBOLProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      vendorList: [],
      purchaseOrderList: [],
      title: "Create Bill Of Lading",
    };

    this.createBillOfLading = this.createBillOfLading.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    const {
      vendorList,
      fetchVendorList,
      purchaseOrderList,
      fetchPurchaseOrderList,
    } = this.props;

    if (vendorList.length <= 0) {
      fetchVendorList();
    }
    if (purchaseOrderList.length <= 0) {
      fetchPurchaseOrderList();
    }

    this.setState({
      vendorList: this.props.vendorList,
      purchaseOrderList: this.props.purchaseOrderList,
    });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.vendorList !== this.props.vendorList) {
      this.setState({
        vendorList: this.props.vendorList,
      });
    }
    if (prevProps.purchaseOrderList !== this.props.purchaseOrderList) {
      this.setState({
        purchaseOrderList: this.props.purchaseOrderList,
      });
    }
  }

  createBillOfLading(billOfLading) {
    this.props.createBillOfLading(billOfLading);
    this.props.navigate("/bill-of-ladings")
  }

  handleCancel() {
    this.props.navigate("/bill-of-ladings")
  }

  render() {
    return (
      <CreateBOLContext.Provider
        value={{
          ...this.state,
          createBillOfLading: this.createBillOfLading,
          handleCancel: this.handleCancel
        }}
      >
        {this.props.children}
      </CreateBOLContext.Provider>
    );
  }
}

const connectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateBOLProvider);

export default withNavigation(connectedComponent);
