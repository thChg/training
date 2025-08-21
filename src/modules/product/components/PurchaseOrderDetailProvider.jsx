import React, { Component } from "react";
import { connect } from "react-redux";
// import { exportProductToExcel } from "../functions/exportProductToExcel";
import { mapDispatchToProps, mapStateToProps } from "../containers/ProductMap";
import { NavigationWrapper } from "../../../masterPage/utils/NavigationWrapper";
import { formatDate } from "../../../masterPage/utils/TimeFormat";

export const ProductContext = React.createContext();

class ProductProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "Purchase Order Detail",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(name, value) {
    this.setState({ [name]: value });
  }

  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleInputChange: this.handleInputChange,
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const connectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductProvider);

export default NavigationWrapper(connectedComponent);
