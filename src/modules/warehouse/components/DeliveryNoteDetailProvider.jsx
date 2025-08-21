import React, { Component } from "react";
import { connect } from "react-redux";
import {
  mapStateToProps,
  mapDispatchToProps,
} from "../containers/DeliveryNoteMap";
import { NavigationWrapper } from "../../../masterPage/components/NavigationWrapper";

export const DeliveryNoteDetailContext = React.createContext();

class DeliveryNoteDetailProvider extends Component {
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
      selectedDN: null,
      name: "",
      orderDate: "",
      customer: "",
      contact: "",
      email: "",
      deliveryAddress: "",
      estimatedDeliveryDate: "",
      approvedAt: "",
      products: [],
      curStatus: "",
    };

    this.resolveDeliveryNote = this.resolveDeliveryNote.bind(this);
  }

  async componentDidMount() {
    const { params, deliveryNoteList, fetchRecordList } = this.props;

    if (deliveryNoteList.length <= 0) {
      fetchRecordList();
    }

    const selectedDN = this.props.deliveryNoteList.find(
      (po) => po._id === params.id
    );

    this.setState({
      selectedDN: selectedDN,
      products: selectedDN.products.map((product) => ({
        _id: product._id,
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        unit: product.unit,
        status: product.status,
      })),
      name: selectedDN.name,
      orderDate: selectedDN.orderDate,
      customer: selectedDN.customer.fullname,
      contact: selectedDN.customer.phone,
      email: selectedDN.customer.email,
      deliveryAddress: selectedDN.deliveryAddress,
      estimatedDeliveryDate: selectedDN.estimatedDeliveryDate,
      approvedAt: selectedDN.approvedAt,
      curStatus: selectedDN.status,
    });
  }

  resolveDeliveryNote(action) {
    const { selectedDN } = this.state;
    const { resolveDeliveryNote, navigate } = this.props;
    resolveDeliveryNote(selectedDN._id, action);
    navigate("/delivery-notes");
  }
  render() {
    return (
      <DeliveryNoteDetailContext.Provider
        value={{
          ...this.state,
          resolveDeliveryNote: this.resolveDeliveryNote,
        }}
      >
        {this.props.children}
      </DeliveryNoteDetailContext.Provider>
    );
  }
}

const connectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeliveryNoteDetailProvider);
export default NavigationWrapper(connectedComponent);
