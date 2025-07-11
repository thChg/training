import React, { Component } from "react";
import { CreateSOContext } from "../components/CreateSOProvider";
import CreateOrderTitle from "../../../masterPage/components/CreateOrderTitle";
import CreateOrderBody from "../../../masterPage/components/CreateOrderBody";

export class CreateSO extends Component {
  static contextType = CreateSOContext;
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { title, productList, customerList, handleCreate, handleCancel } = this.context;
    return (
      <div>
        <CreateOrderTitle title={title} />
        <CreateOrderBody
          customerList={customerList}
          productList={productList}
          onCreate={handleCreate}
          onCancel={handleCancel}
        />
      </div>
    );
  }
}

export default CreateSO;
