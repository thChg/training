import React, { Component } from "react";
import ListTitle from "../../../masterPage/components/ListTitle";
import Footer from "../../../masterPage/components/Footer";
import ListSearchResult from "../../../masterPage/components/ListSearchResult";
import FunctionTitle from "../../../masterPage/components/FunctionTitle";
import { PODetailContext } from "../components/PODetailProvider";
import PurchaseOrderDetailTitle from "../components/PurchaseOrderDetailTitle";
import PurchaseOrderDetailBody from "../components/PurchaseOrderDetailBody";

export class PODetail extends Component {
  static contextType = PODetailContext;
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      curStatus,
      permissions,
      handleDelete,
      handleEdit,
      handleSave,
      isEditing,
      contact,
      email,
      address,
      taxId,
      products,
      name,
      orderDate,
      estimatedDeliveryDate,
      handleInputChange,
      vendor,
      approvedAt
    } = this.context;
    return (
      <div>
        <PurchaseOrderDetailTitle
          curStatus={curStatus}
          permissions={permissions}
          onEdit={handleEdit}
          isEditing={isEditing}
          onSave={handleSave}
          onDelete={handleDelete}
        />
        <PurchaseOrderDetailBody
          name={name}
          contact={contact}
          email={email}
          address={address}
          taxId={taxId}
          products={products}
          orderDate={orderDate}
          vendor={vendor}
          estimatedDeliveryDate={estimatedDeliveryDate}
          isEditing={isEditing}
          onInputChange={handleInputChange}
          approvedAt={approvedAt}
        />
      </div>
    );
  }
}

export default PODetail;
