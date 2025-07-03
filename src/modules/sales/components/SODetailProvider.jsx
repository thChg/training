import React, { Component } from "react";
import { connect } from "react-redux";
// import { exportBillOfLadingToExcel } from "../functions/exportBillOfLadingToExcel";
import {
  mapDispatchToProps,
  mapStateToProps,
} from "../containers/SaleOrderMap";
import { withNavigation } from "../../user/functions/withNavigation";

export const SODetailContext = React.createContext();

class SODetailProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      columns: ["name", "price", "quantity", "unit", "status"],
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
      createModalVisible: false,
      selectedSO: null,
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.exportToExcel = this.exportToExcel.bind(this);
    this.setRecordPerPage = this.setRecordPerPage.bind(this);
    this.setCurrentPage = this.setCurrentPage.bind(this);
    this.handleDeleteRecords = this.handleDeleteRecords.bind(this);
    this.removeFromSelectedRecords = this.removeFromSelectedRecords.bind(this);
    this.printSelectedRecords = this.printSelectedRecords.bind(this);
    this.setSelectedRecords = this.setSelectedRecords.bind(this);
    this.toggleCreateModalVisible = this.toggleCreateModalVisible.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  async componentDidMount() {
    const { params, saleOrderList } = this.props;

    const selectedSO = saleOrderList.find(
      (po) => po._id === params.id
    );

    this.setState({
      selectedSO: selectedSO,
      title: selectedSO.name,
      searchResult: selectedSO.products.map((product) => ({
        _id: product._id,
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        unit: product.unit,
        status: product.status,
      })),
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.billOfLadingList !== this.props.billOfLadingList) {
      this.setState({
        searchResult: this.state.selectedSO.products.map((product) => ({
          _id: product._id,
          name: product.name,
          price: product.price,
          quantity: product.quantity,
          unit: product.unit,
          status: product.status,
        })),
      });
    }
  }

  toggleCreateModalVisible() {
    this.setState((prevState) => ({
      createModalVisible: !prevState.createModalVisible,
    }));
  }

  handleSearch(searchTerm) {
    const { selectedSO } = this.state;

    const result = searchTerm
      ? selectedSO.products.filter((product) =>
          product.name.toLowerCase().includes(searchTerm)
        )
      : selectedSO.products;
    this.setState({
      searchResult: result.map((product) => ({
        _id: product._id,
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        unit: product.unit,
        status: product.status,
      })),
    });
  }

  async exportToExcel() {
    const { selectedRecords } = this.state;
    if (selectedRecords.length === 0) return;
    const data = await this.props.fetchBillOfLadingData(selectedRecords);

    // await exportBillOfLadingToExcel(data);
  }

  setRecordPerPage(recordPerPage) {
    this.setState({ recordPerPage, currentPage: 1 });
    this.props.fetchBillOfLadingList(1, recordPerPage);
  }
  setCurrentPage(page) {
    this.setState({ currentPage: page });
    this.props.fetchBillOfLadingList(page, this.state.recordPerPage);
  }

  handleDeleteRecords() {
    const { selectedRecords, currentPage, recordPerPage } = this.state;
    this.props.deleteManyBillOfLading(
      selectedRecords,
      currentPage,
      recordPerPage
    );
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
  handleSelect() {
    return;
  }

  render() {
    return (
      <SODetailContext.Provider
        value={{
          ...this.state,
          handleSearch: this.handleSearch,
          exportToExcel: this.exportToExcel,
          setRecordPerPage: this.setRecordPerPage,
          setCurrentPage: this.setCurrentPage,
          handleDeleteRecords: this.handleDeleteRecords,
          removeFromSelectedRecords: this.removeFromSelectedRecords,
          printSelectedRecords: this.printSelectedRecords,
          setSelectedRecords: this.setSelectedRecords,
          toggleCreateModalVisible: this.toggleCreateModalVisible,
          setSelectedBOLId: this.setSelectedBOLId,
          handleSelect: this.handleSelect,
        }}
      >
        {this.props.children}
      </SODetailContext.Provider>
    );
  }
}

const connectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(SODetailProvider);
export default withNavigation(connectedComponent);
