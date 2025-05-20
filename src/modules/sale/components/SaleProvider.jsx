import React, { Component } from "react";
import SaleContext from "./SaleContext";
import { CreateReloadHanlder } from "../functions/Reload";
import { CreateSetSearchResult } from "../functions/SetSearchResult";
import { CreateNewOrderPermissionHandler } from "../functions/NewOrderHandler";

export class SaleProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reloadKey: 0,
      searchResult: [],
      canCreateNewOrder: false,
      newOrderModalVisisble: false,
    };

    this.handleReload = CreateReloadHanlder(this);
    this.setSearchResult = CreateSetSearchResult(this);
    this.newOrderHandler = CreateNewOrderPermissionHandler(this);
    
    this.state = {
      ...this.state,
      handleReload: this.handleReload,
      setSearchResult: this.setSearchResult,
      newOrderHandler: this.newOrderHandler,
    };
  }

  render() {
    return (
      <SaleContext.Provider value={this.state}>
        {this.props.children}
      </SaleContext.Provider>
    );
  }
}

export default SaleProvider;
