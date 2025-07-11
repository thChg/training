import React, { Component } from "react";
import { BOLDetailContext } from "../components/BOLDetailProvider";
import BOLDetailTitle from "../components/BOLDetailTitle";
import BOLDetailBody from "../components/BOLDetailBody";

export class BOLDetail extends Component {
  static contextType = BOLDetailContext;
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      title,
      name,
      vendor,
      contact,
      email,
      address,
      taxId,
      purchaseOrders,
      products,
    } = this.context;
    return (
      <div>
        <BOLDetailTitle title={title} />
        <BOLDetailBody
          name={name}
          vendor={vendor}
          contact={contact}
          email={email}
          address={address}
          taxId={taxId}
          purchaseOrders={purchaseOrders}
          products={products}
        />
      </div>
    );
  }
}

export default BOLDetail;
