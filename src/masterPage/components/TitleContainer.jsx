import React, { Component } from "react";

export class TitleContainer extends Component {
  render() {
    return (
      <div
        style={{
          borderBottom: "1px solid #b3b3b3",
          backgroundColor: "#f8f8f8",
          borderTopLeftRadius: "5px",
          borderTopRightRadius: "5px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0px 10px 0px 15px",
          position: "sticky",
          top: 0,
          zIndex: 1,
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

export default TitleContainer;
