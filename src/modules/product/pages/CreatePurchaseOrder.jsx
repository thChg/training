import React, { Component } from "react";
import { CreatePOContext } from "../components/CreatePOProvider";
import CreateOrderTitle from "../../../masterPage/components/CreateOrderTitle";
import CreateOrderBody from "../../../masterPage/components/CreateOrderBody";

export class CreatePO extends Component {
  static contextType = CreatePOContext;
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { title, handleCreate, handleCancel, productList } = this.context;
    return (
      <div>
        <CreateOrderTitle title={title} />
        <CreateOrderBody onCreate={handleCreate} onCancel={handleCancel} productList={productList}/>
      </div>
    );
  }
}

export default CreatePO;
