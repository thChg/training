import React, { Component } from "react";
import { connect } from "react-redux";
import { exportProductToExcel } from "../functions/exportProductToExcel";
import {
  mapDispatchToProps,
  mapStateToProps,
} from "../containers/PurchaseOrderMap";
import { withNavigation } from "../../user/functions/withNavigation";

export const PurchaseOrderContext = React.createContext();

class PurchaseOrderProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "Purchase Order Management",
      columns: ["name", "status"],
      loading: this.props.loading,
      searchResult: [],
      permissions: this.props.permissions.reduce((accumulator, permission) => {
        if (permission.includes("product")) {
          return [...accumulator, permission.split(":")[1].slice(0, -1)];
        }
        return accumulator;
      }, []),
      selectedRecords: [],
      recordLength: this.props.recordLength,
      recordPerPage: 10,
      currentPage: 1,
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.exportToExcel = this.exportToExcel.bind(this);
    this.setRecordPerPage = this.setRecordPerPage.bind(this);
    this.setCurrentPage = this.setCurrentPage.bind(this);
    this.handleDeleteRecords = this.handleDeleteRecords.bind(this);
    this.removeFromSelectedRecords = this.removeFromSelectedRecords.bind(this);
    this.printSelectedRecords = this.printSelectedRecords.bind(this);
    this.setSelectedRecords = this.setSelectedRecords.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
  }

  async componentDidMount() {
    const { purchaseOrderList, fetchPurchaseOrderList } = this.props;
    const { currentPage, recordPerPage } = this.state;
    if (purchaseOrderList.length <= 0) {
      await fetchPurchaseOrderList(currentPage, recordPerPage);
    }
    this.setState({
      searchResult: this.props.purchaseOrderList.map((purchaseOrder) => ({
        _id: purchaseOrder._id,
        name: purchaseOrder.name,
        status: purchaseOrder.status,
      })),
      recordLength: this.props.recordLength,
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.purchaseOrderList !== this.props.purchaseOrderList) {
      this.setState({
        searchResult: this.props.purchaseOrderList.map((purchaseOrder) => ({
          _id: purchaseOrder._id,
          name: purchaseOrder.name,
          status: purchaseOrder.status,
        })),
        recordLength: this.props.recordLength,
      });
    }
  }

  handleSearch(searchTerm) {
    const purchaseOrderList = this.props.purchaseOrderList;

    const result = searchTerm
      ? purchaseOrderList.filter((purchaseOrder) =>
          purchaseOrder.name.toLowerCase().includes(searchTerm)
        )
      : purchaseOrderList;
    this.setState({
      searchResult: result.map((purchaseOrder) => ({
        _id: purchaseOrder._id,
        name: purchaseOrder.name,
        status: purchaseOrder.status,
      })),
    });
  }

  handleCreate() {
    this.props.navigate("/create-purchase-order");
  }

  async exportToExcel() {
    const { selectedRecords } = this.state;
    if (selectedRecords.length === 0) return;
    const data = await this.props.fetchProductData(selectedRecords);

    await exportProductToExcel(data);
  }

  setRecordPerPage(recordPerPage) {
    this.setState({ recordPerPage, currentPage: 1 });
    this.props.fetchPurchaseOrderList(1, recordPerPage);
  }
  setCurrentPage(page) {
    this.setState({ currentPage: page });
    this.props.fetchPurchaseOrderList(page, this.state.recordPerPage);
  }

  handleDeleteRecords() {
    const { selectedRecords, currentPage, recordPerPage } = this.state;
    this.props.deleteManyProduct(selectedRecords, currentPage, recordPerPage);
    this.setState({ selectedRecords: [] });
  }

  removeFromSelectedRecords(record, isDeselect) {
    if (isDeselect) {
      this.setState({ selectedRecords: [] });
    } else {
      this.setState((prevState) => {
        return {
          selectedRecords: prevState.selectedRecords.filter(
            (element) => element !== record
          ),
        };
      });
    }
  }

  printSelectedRecords() {
    const { selectedRecords } = this.state;
    this.props.printRecords(selectedRecords);
  }

  setSelectedRecords(record, isChecked, isHeader) {
    const { selectedRecords, searchResult } = this.state;
    const currentPageIds = searchResult.map((element) => element._id);
    if (isHeader == "true") {
      if (isChecked) {
        const res = selectedRecords.filter(
          (record) => !currentPageIds.includes(record)
        );

        this.setState({ selectedRecords: res });
      } else {
        const res = selectedRecords.concat(currentPageIds);
        const set = new Set(res);
        const uniqueArray = [...set];

        this.setState({ selectedRecords: uniqueArray });
      }
    } else {
      this.setState((prevState) => {
        if (prevState.selectedRecords.includes(record)) {
          return {
            selectedRecords: prevState.selectedRecords.filter(
              (element) => element !== record
            ),
          };
        }
        return {
          selectedRecords: [...prevState.selectedRecords, record],
        };
      });
    }
  }

  handleSelect(POId) {
    this.props.navigate(`/purchase-orders/details/${POId}`);
  }

  render() {
    return (
      <PurchaseOrderContext.Provider
        value={{
          ...this.state,
          handleSearch: this.handleSearch,
          exportToExcel: this.exportToExcel,
          setRecordPerPage: this.setRecordPerPage,
          setCurrentPage: this.setCurrentPage,
          handleDeleteRecords: this.handleDeleteRecords,
          removeFromSelectedRecords: this.removeFromSelectedRecords,
          printSelectedRecords: this.printSelectedRecords,
          handleSelect: this.handleSelect,
          setSelectedRecords: this.setSelectedRecords,
          handleCreate: this.handleCreate,
        }}
      >
        {this.props.children}
      </PurchaseOrderContext.Provider>
    );
  }
}

const connectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(PurchaseOrderProvider);

export default withNavigation(connectedComponent)
