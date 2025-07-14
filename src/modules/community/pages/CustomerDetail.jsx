import React, { Component } from "react";
import DetailTitle from "../components/DetailTitle";
import { CustomerDetailContext } from "../components/CustomerDetailProvider";
import CustomerDetailBody from "../components/CustomerDetailBody";

export class CustomerDetail extends Component {
  static contextType = CustomerDetailContext;
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { title, fullname, contact, email, saleOrders } = this.context;
    return (
      <div>
        <DetailTitle title={title} />
        <CustomerDetailBody name={fullname} contact={contact} email={email} saleOrders={saleOrders}/>
      </div>
    );
  }
}

export default CustomerDetail;
