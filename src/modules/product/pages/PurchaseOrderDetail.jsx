import React, { Component } from "react";
import ListTitle from "../../../masterPage/components/ListTitle";
import Footer from "../../../masterPage/components/Footer";
import ListSearchResult from "../../../masterPage/components/ListSearchResult";
import FunctionTitle from "../../../masterPage/components/FunctionTitle";
import { PODetailContext } from "../components/PODetailProvider";
import OrderDetailTitle from "../../../masterPage/components/OrderDetailTitle";

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
    } = this.context;
    return (
      <OrderDetailTitle
        curStatus={curStatus}
        permissions={permissions}
        onEdit={handleEdit}
        isEditing={isEditing}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    );
  }
}

export default PODetail;
