import React, { Component } from "react";
import ListTitle from "../components/ListTitle";
import SaleProvider from "../components/SaleProvider";
import ErrorModal from "../../../masterPage/components/ErrorModal";
import ListSearchResult from "../components/ListSearchResult";

export class Order extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }


  render() {
    return (
      <SaleProvider>
        <ListTitle title="Orders" />
        <ErrorModal />
        <ListSearchResult />
      </SaleProvider>
    );
  }
}

export default Order;
