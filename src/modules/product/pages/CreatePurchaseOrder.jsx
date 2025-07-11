import React, { Component } from "react";
import { CreatePOContext } from "../components/CreatePOProvider";
import CreateOrderTitle from "../../../masterPage/components/CreateOrderTitle";
import CreatePurchaseOrderBody from "../components/CreatePurchaseOrderBody";

export class CreatePO extends Component {
  static contextType = CreatePOContext;
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { title, handleCreate, handleCancel, productList, vendorList } =
      this.context;
    return (
      <div>
        <CreateOrderTitle title={title} />
        <CreatePurchaseOrderBody
          vendorList={vendorList}
          productList={productList}
          onCreate={handleCreate}
          onCancel={handleCancel}
        />
      </div>
    );
  }
}

export default CreatePO;
