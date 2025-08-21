import React, { Component } from "react";

export class RecordSummary extends Component {
  render() {
    if (!this.context?.self) return null;
    const { self } = this.context;
    const { length } = self.state.data;
    return <div style={{ fontSize: "0.8rem" }}>Found {length} record(s).</div>;
  }
}

export default RecordSummary;
