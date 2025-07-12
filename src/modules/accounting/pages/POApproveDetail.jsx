import React, { Component } from "react";
import Footer from "../../../masterPage/components/Footer";
import ListSearchResult from "../../../masterPage/components/ListSearchResult";
import { POApproveDetailContext } from "../components/POApproveDetailProvider";
import OrderApproveTitle from "../../../masterPage/components/OrderApproveTitle";
import PurchaseOrderDetailTitle from "../../product/components/PurchaseOrderDetailTitle";
import PurchaseOrderDetailBody from "../../product/components/PurchaseOrderDetailBody";

export class POApproveDetail extends Component {
  static contextType = POApproveDetailContext;
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      permissions,
      page,
      handleResolvePO,
      curStatus,
      contact,
      email,
      address,
      taxId,
      estimatedDeliveryDate,
      name,
      orderDate,
      isEditing,
      vendor,
      products,
      approvedAt
    } = this.context;

    return (
      <div>
        <PurchaseOrderDetailTitle
          permissions={permissions}
          onResolve={handleResolvePO}
          curStatus={curStatus}
        />
        <PurchaseOrderDetailBody
          contact={contact}
          email={email}
          address={address}
          taxId={taxId}
          estimatedDeliveryDate={estimatedDeliveryDate}
          name={name}
          orderDate={orderDate}
          isEditing={isEditing}
          vendor={vendor}
          products={products}
          approvedAt={approvedAt}
        />
      </div>
    );
  }
}

export default POApproveDetail;
