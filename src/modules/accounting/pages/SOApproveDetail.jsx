import React, { Component } from "react";
import Footer from "../../../masterPage/components/Footer";
import ListSearchResult from "../../../masterPage/components/ListSearchResult";
import { SOApproveDetailContext } from "../components/SOApproveDetailProvider";
import OrderApproveTitle from "../../../masterPage/components/OrderApproveTitle";
import OrderDetailTitle from "../../../masterPage/components/OrderDetailTitle";
import OrderDetailBody from "../../../masterPage/components/OrderDetailBody";

export class SOApproveDetail extends Component {
  static contextType = SOApproveDetailContext;
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      permissions,
      page,
      handleResolveSO,
      curStatus,
      contact,
      email,
      estimatedDeliveryDate,
      name,
      orderDate,
      isEditing,
      customer,
      products,
      deliveryAddress,
      approvedAt,
    acceptedAt,
    } = this.context;

    return (
      <div>
        <OrderDetailTitle
          curStatus={curStatus}
          permissions={permissions}
          isEditing={isEditing}
          page={page}
          onResolveSO={handleResolveSO}
        />        
        <OrderDetailBody
          name={name}
          orderDate={orderDate}
          customer={customer}
          contact={contact}
          email={email}
          deliveryAddress={deliveryAddress}
          estimatedDeliveryDate={estimatedDeliveryDate}
          products={products}
          approvedAt={approvedAt}
          acceptedAt={acceptedAt}
          isEditing={isEditing}
        />
      </div>
    );
  }
}

export default SOApproveDetail;
