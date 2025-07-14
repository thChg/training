import React, { Component } from "react";
import { InventorySummaryContext } from "../components/InventorySummaryProvider";
import InventorySummaryTitle from "../components/InventorySummaryTitle";
import InventorySummaryBody from "../components/InventorySummaryBody";

export class InventorySummary extends Component {
  static contextType = InventorySummaryContext;
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { title, searchResult } = this.context;
    return (
      <div>
        <InventorySummaryTitle title={title} />
        <InventorySummaryBody inventorySummary={searchResult} />
      </div>
    );
  }
}

export default InventorySummary;
