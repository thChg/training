import React, { Component } from "react";
import { connect } from "react-redux";
// import { exportBillOfLadingToExcel } from "../functions/exportBillOfLadingToExcel";
import {
  mapDispatchToProps,
  mapStateToProps,
} from "../containers/BillOfLadingMap";
import { withNavigation } from "../../user/functions/withNavigation";
import { uniqBy } from "lodash";

export const BOLDetailContext = React.createContext();

class BOLDetailProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "Bill Of Lading Detail",
      name: "",
      vendor: "",
      contact: "",
      email: "",
      address: "",
      taxId: "",
      purchaseOrders: [],
      products: []
    };
  }

  componentDidMount() {
    const { billOfLadingList, fetchBillOfLadingList } = this.props;

    if (billOfLadingList.length <= 0) {
      fetchBillOfLadingList();
    }

    const { id } = this.props.params;
    const bol = this.props.billOfLadingList.find((bol) => bol._id === id);

    const uniquePO = uniqBy(bol.products, p => p.purchaseOrder._id).map(p => p.purchaseOrder)
    this.setState({
      name: bol.name,
      vendor: bol.vendor.name,
      contact: bol.vendor.phone,
      email: bol.vendor.email,
      address: bol.vendor.address,
      taxId: bol.vendor.taxId,
      purchaseOrders: uniquePO,
      products: bol.products
    });
  }

  render() {
    return (
      <BOLDetailContext.Provider
        value={{
          ...this.state,
        }}
      >
        {this.props.children}
      </BOLDetailContext.Provider>
    );
  }
}

const connectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(BOLDetailProvider);
export default withNavigation(connectedComponent);
