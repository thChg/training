import React, { Component } from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProp } from "../containers/CustomerMap";
import { withNavigation } from "../../user/functions/withNavigation";

export const CustomerDetailContext = React.createContext();

export class CustomerDetailProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "Customer Detail",
      email: "",
      fullname: "",
      contact: "",
      saleOrders: [],
    };
  }

  async componentDidMount() {
    const { customerList, fetchCustomerList, saleOrderList, fetchSaleOrderList } = this.props;
    const { id } = this.props.params;
    if (customerList.length <= 0) {
      await fetchCustomerList();
    }
    if (saleOrderList.length <= 0 ) {
      fetchSaleOrderList();
    }

    const selectedCustomer = this.props.customerList.find(
      (customer) => customer._id === id
    );
    const customerSO = this.props.saleOrderList.filter(so => so.customer._id === id);

    this.setState({
      fullname: selectedCustomer.fullname,
      email: selectedCustomer.email,
      contact: selectedCustomer.phone,
      saleOrders: customerSO,
    });
  }

  render() {
    return (
      <CustomerDetailContext.Provider
        value={{
          ...this.state,
        }}
      >
        {this.props.children}
      </CustomerDetailContext.Provider>
    );
  }
}

const connectedComponent = connect(
  mapStateToProps,
  mapDispatchToProp
)(CustomerDetailProvider);

export default withNavigation(connectedComponent);
