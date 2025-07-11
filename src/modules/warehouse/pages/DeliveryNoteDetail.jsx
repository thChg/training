import React, { Component } from "react";
import { DeliveryNoteDetailContext } from "../components/DeliveryNoteDetailProvider";
import OrderDetailTitle from "../../../masterPage/components/OrderDetailTitle";
import OrderDetailBody from "../../../masterPage/components/OrderDetailBody";
import DeliveryNoteDetailTitle from "../components/DeliveryNoteDetailTitle";
import DeliveryNoteDetailBody from "../components/DeliveryNoteDetailBody";

export class DeliveryNoteDetail extends Component {
  static contextType = DeliveryNoteDetailContext;
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      name,
      orderDate,
      customer,
      contact,
      email,
      deliveryAddress,
      estimatedDeliveryDate,
      products,
      approvedAt,
      resolveDeliveryNote,
      permissions,
      curStatus,
    } = this.context;
    return (
      <div>
        <DeliveryNoteDetailTitle
          onResolve={resolveDeliveryNote}
          permissions={permissions}
          curStatus={curStatus}
        />
        <DeliveryNoteDetailBody
          products={products}
          name={name}
          orderDate={orderDate}
          customer={customer}
          contact={contact}
          email={email}
          estimatedDeliveryDate={estimatedDeliveryDate}
          deliveryAddress={deliveryAddress}
          approvedAt={approvedAt}
          status={curStatus}
        />
      </div>
    );
  }
}

export default DeliveryNoteDetail;
