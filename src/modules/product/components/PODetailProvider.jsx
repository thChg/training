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
      name: "",
      vendor: "",
      contact: "",
      email: "",
      taxId: "",
      address: "",
      estimatedDeliveryDate: "",
      curStatus: "",
      products: [],
      orderDate: "",
      approvedAt: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  async componentDidMount() {
    const { params, purchaseOrderList, fetchPurchaseOrderList } = this.props;

    if (purchaseOrderList.length <= 0) {
      fetchPurchaseOrderList();
    }

    const selectedPO = purchaseOrderList.find((po) => po._id === params.id);

    this.setState({
      selectedPO: selectedPO,
      name: selectedPO.name,
      vendor: selectedPO.vendor.name,
      contact: selectedPO.vendor.phone,
      email: selectedPO.vendor.email,
      taxId: selectedPO.vendor.taxId,
      address: selectedPO.vendor.address,
      estimatedDeliveryDate: selectedPO.estimatedDeliveryDate,
      curStatus: selectedPO.status,
      products: selectedPO.products,
      orderDate: selectedPO.orderDate,
      approvedAt: selectedPO.approvedAt,
    });
  }

  handleEdit() {
    this.setState((prevState) => ({
      isEditing: !prevState.isEditing,
    }));
  }

  handleInputChange(name, value) {
    this.setState({ [name]: value });
  }

  handleSave() {
    const { name, estimatedDeliveryDate, orderDate } = this.state;
    const { params, updatePurchaseOrder } = this.props;
    updatePurchaseOrder({
      _id: params.id,
      name,
      estimatedDeliveryDate,
      orderDate,
    });

    this.handleEdit();
  }

  render() {
    return (
      <PODetailContext.Provider
        value={{
          ...this.state,
          handleInputChange: this.handleInputChange,
          handleEdit: this.handleEdit,
          handleSave: this.handleSave,
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
