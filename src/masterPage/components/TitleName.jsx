import React, { Component } from "react";

export class TitleName extends Component {
  render() {
    const { functionName } = this.context.self.state;
    return (
      <div
        style={{
          display: "inline-block",
          fontWeight: "650",
          fontSize: "1.3em",
          padding: "11px 0px",
        }}
      >
        {functionName}
      </div>
    );
  }
}

export default TitleName;
