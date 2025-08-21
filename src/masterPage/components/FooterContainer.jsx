import React, { Component } from "react";

export class FooterContainer extends Component {
  render() {
    return (
      <div
        style={{
          position: "absolute",
          bottom: "0px",
          borderTop: "1px solid #b3b3b3",
          backgroundColor: "#f8f8f8",
          borderBottomLeftRadius: "5px",
          borderBottomRightRadius: "5px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0px 10px 0px 15px",
          width: "100%",
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

export default FooterContainer;
