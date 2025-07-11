import React, { Component } from "react";
import { SODetailContext } from "../components/SODetailProvider";
import OrderDetailTitle from "../../../masterPage/components/OrderDetailTitle";
import OrderDetailBody from "../../../masterPage/components/OrderDetailBody";

export class SODetail extends Component {
  static contextType = SODetailContext;
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      curStatus,
      name,
      orderDate,
      customer,
      contact,
      email,
      deliveryAddress,
      estimatedDeliveryDate,
      products,
      approvedAt,
      completedAt,
      isEditing,
      toggleIsEditing,
      permissions,
      handleSave,
      handleInputChange,
      handleDelete
    } = this.context;
    return (
      <div>
        <OrderDetailTitle
          curStatus={curStatus}
          onEdit={toggleIsEditing}
          permissions={permissions}
          isEditing={isEditing}
          onSave={handleSave}
          onDelete={handleDelete}
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
          completedAt={completedAt}
          isEditing={isEditing}
          onInputChange={handleInputChange}
          
        />
      </div>
    );
  }
}

export default SODetail;
