import React, { Component } from "react";
import DetailTitle from "../components/DetailTitle";
import { VendorDetailContext } from "../components/VendorDetailProvider";
import VendorDetailBody from "../components/VendorDetailBody";

export class VendorDetail extends Component {
  static contextType = VendorDetailContext;
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { title, name, email, address, contact, taxId, purchaseOrders } = this.context;
    return (
      <div>
        <DetailTitle title={title} />
        <VendorDetailBody
          name={name}
          email={email}
          address={address}
          contact={contact}
          taxId={taxId}
          purchaseOrders={purchaseOrders}
        />
      </div>
    );
  }
}

export default VendorDetail;
