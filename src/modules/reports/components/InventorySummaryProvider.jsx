import React, { Component } from "react";
import { connect } from "react-redux";
import {
  mapDispatchToProps,
  mapStateToProps,
} from "../containers/InventorySummaryMap";
import { NavigationWrapper } from "../../../masterPage/components/NavigationWrapper";

export const InventorySummaryContext = React.createContext();

class InventorySummaryProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "Inventory Summary",
      loading: this.props.loading,
      permissions: this.props.permissions.reduce((accumulator, permission) => {
        if (permission.includes("reports")) {
          return [...accumulator, permission.split(":")[1].slice(0, -1)];
        }
        return accumulator;
      }, []),
      recordLength: this.props.recordLength,
      recordPerPage: 10,
      currentPage: 1,
      searchResult: [],
    };

    this.setRecordPerPage = this.setRecordPerPage.bind(this);
    this.setCurrentPage = this.setCurrentPage.bind(this);
  }

  async componentDidMount() {
    const { inventorySummary, fetchInventorySummaryList } = this.props;
    const { currentPage, recordPerPage } = this.state;
    if (inventorySummary.length <= 0) {
      await fetchInventorySummaryList(currentPage, recordPerPage);
    }
    this.setState({
      searchResult: this.props.inventorySummary.map((inventorySummary) => ({
        _id: inventorySummary._id,
        name: inventorySummary.productName,
        unit: inventorySummary.unit,
        importQty: inventorySummary.importQuantity,
        importAvgPrice: inventorySummary.importAvgPrice,
        exportQty: inventorySummary.exportQuantity,
        exportAvgPrice: inventorySummary.exportAvgPrice,
      })),
      recordLength: this.props.recordLength,
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.inventorySummary !== this.props.inventorySummary) {
      this.setState({
        searchResult: this.props.inventorySummary.map((inventorySummary) => ({
          _id: inventorySummary._id,
          name: inventorySummary.productName,
          unit: inventorySummary.unit,
          importQty: inventorySummary.importQuantity,
          importAvgPrice: inventorySummary.importAvgPrice,
          exportQty: inventorySummary.exportQuantity,
          exportAvgPrice: inventorySummary.exportAvgPrice,
        })),
        recordLength: this.props.recordLength,
      });
    }
  }

  setRecordPerPage(recordPerPage) {
    this.setState({ recordPerPage, currentPage: 1 });
    this.props.fetchInventorySummaryList(1, recordPerPage);
  }

  setCurrentPage(page) {
    this.setState({ currentPage: page });
    this.props.fetchInventorySummaryList(page, this.state.recordPerPage);
  }

  render() {
    return (
      <InventorySummaryContext.Provider
        value={{
          ...this.state,
          setRecordPerPage: this.setRecordPerPage,
          setCurrentPage: this.setCurrentPage,
        }}
      >
        {this.props.children}
      </InventorySummaryContext.Provider>
    );
  }
}

const connectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(InventorySummaryProvider);

export default NavigationWrapper(connectedComponent);
