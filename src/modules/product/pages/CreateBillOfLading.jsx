import React, { Component } from "react";
import CreateBOLTitle from "../components/CreateBOLTitle";
import CreateBOLBody from "../components/CreateBOLBody";
import { CreateBOLContext } from "../components/CreateBOLProvider";

export class CreateBillOfLading extends Component {
  static contextType = CreateBOLContext;
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { vendorList, title, purchaseOrderList, createBillOfLading, handleCancel } =
      this.context;
    return (
      <div>
        <CreateBOLTitle title={title} />
        <CreateBOLBody
          vendorList={vendorList}
          purchaseOrderList={purchaseOrderList}
          onCreate={createBillOfLading}
          onCancel={handleCancel}
        />
      </div>
    );
  }
}

export default CreateBillOfLading;
