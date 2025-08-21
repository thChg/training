import React, { Component } from "react";

export class TableContainer extends Component {
  render() {
    return (
      <table
        style={{
          borderCollapse: "separate",
          borderSpacing: 0,
          width: "100%",
        }}
      >
        {this.props.children}
      </table>
    );
  }
}

export default TableContainer;
