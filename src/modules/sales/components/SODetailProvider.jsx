import React, { Component } from "react";
import { connect } from "react-redux";
// import { exportBillOfLadingToExcel } from "../functions/exportBillOfLadingToExcel";
import {
  mapDispatchToProps,
  mapStateToProps,
} from "../containers/SaleOrderMap";
import { NavigationWrapper } from "../../../masterPage/components/NavigationWrapper";

export const SODetailContext = React.createContext();

class SODetailProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: this.props.loading,
      permissions: this.props.permissions.reduce((accumulator, permission) => {
        if (permission.includes("sales")) {
          return [...accumulator, permission.split(":")[1].slice(0, -1)];
        }
        return accumulator;
      }, []),
      selectedSO: null,
      curStatus: "",
      name: "",
      orderDate: "",
      customer: "",
      contact: "",
      email: "",
      deliveryAddress: "",
      estimatedDeliveryDate: "",
      products: [],
      approvedAt: "",
      acceptedAt: "",
      isEditing: false,
    };

    this.toggleIsEditing = this.toggleIsEditing.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  async componentDidMount() {
    const { params, saleOrderList } = this.props;

    const selectedSO = saleOrderList.find((po) => po._id === params.id);

    this.setState({
      selectedSO: selectedSO,
      products: selectedSO.products.map((product) => ({
        _id: product._id,
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        unit: product.unit,
        status: product.status,
      })),
      curStatus: selectedSO.status,
      name: selectedSO.name,
      orderDate: selectedSO.orderDate,
      customer: selectedSO.customer.fullname,
      contact: selectedSO.customer.phone,
      email: selectedSO.customer.email,
      deliveryAddress: selectedSO.deliveryAddress,
      estimatedDeliveryDate: selectedSO.estimatedDeliveryDate,
      approvedAt: selectedSO.approvedAt,
      acceptedAt: selectedSO.acceptedAt,
    });
  }

  toggleIsEditing() {
    this.setState((prevState) => ({
      isEditing: !prevState.isEditing,
    }));
  }

  handleInputChange(name, value) {
    this.setState({ [name]: value });
  }

  handleSave() {
    const {
      name,
      orderDate,
      deliveryAddress,
      estimatedDeliveryDate,
      approvedAt,
      acceptedAt,
      selectedSO,
    } = this.state;
    this.props.updateSaleOrder({
      _id: selectedSO._id,
      name,
      orderDate,
      deliveryAddress,
      estimatedDeliveryDate,
      approvedAt,
      acceptedAt,
    });
    this.setState({ isEditing: false });
  }

  handleDelete() {
    const { selectedSO } = this.state;
    const { deleteSaleOrder, navigate } = this.props;
    deleteSaleOrder(selectedSO._id);
    navigate("/sale-orders");
  }

  render() {
    return (
      <SODetailContext.Provider
        value={{
          ...this.state,
          toggleIsEditing: this.toggleIsEditing,
          handleSave: this.handleSave,
          handleInputChange: this.handleInputChange,
          handleDelete: this.handleDelete,
        }}
      >
        {this.props.children}
      </SODetailContext.Provider>
    );
  }
}

const connectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(SODetailProvider);
export default NavigationWrapper(connectedComponent);
