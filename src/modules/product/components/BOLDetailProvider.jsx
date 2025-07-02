import React, { Component } from "react";
import { connect } from "react-redux";
// import { exportBillOfLadingToExcel } from "../functions/exportBillOfLadingToExcel";
import {
  mapDispatchToProps,
  mapStateToProps,
} from "../containers/BillOfLadingMap";
import { withNavigation } from "../../user/functions/withNavigation";

export const BOLDetailContext = React.createContext();

class BOLDetailProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "Bill Of Lading Management",
      columns: ["name", "price", "quantity", "unit", "purchaseOrder"],
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
      selectedBOL: null,
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
    const { billOfLadingList, fetchBillOfLadingList, params } = this.props;
    const { currentPage, recordPerPage } = this.state;

    if (billOfLadingList.length <= 0) {
      await fetchBillOfLadingList(currentPage, recordPerPage);
    }

    const selectedBOL = this.props.billOfLadingList.find(
      (bol) => bol._id === params.id
    );

    this.setState({
      selectedBOL: selectedBOL,
      title: selectedBOL.name,
      searchResult: selectedBOL.products.map((product) => ({
        _id: product._id,
        name: product.name,
        price: product.price,
        purchaseOrder: product.purchaseOrder.name,
        quantity: product.quantity,
        unit: product.unit,
      })),
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.billOfLadingList !== this.props.billOfLadingList) {
      this.setState({
        searchResult: this.state.selectedBOL.products.map((product) => ({
          _id: product._id,
          name: product.name,
          price: product.price,
          purchaseOrder: product.purchaseOrder.name,
          quantity: product.quantity,
          unit: product.unit,
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
    const { selectedBOL } = this.state;

    const result = searchTerm
      ? selectedBOL.products.filter((product) =>
          product.name.toLowerCase().includes(searchTerm)
        )
      : selectedBOL.products;
    this.setState({
      searchResult: result.map((product) => ({
        _id: product._id,
        name: product.name,
        price: product.price,
        purchaseOrder: product.purchaseOrder.name,
        quantity: product.quantity,
        unit: product.unit,
      })),
    });
  }

  async exportToExcel() {
    const { selectedRecords } = this.state;
    if (selectedRecords.length === 0) return;
    const data = await this.props.fetchBillOfLadingData(selectedRecords);

    // await exportBillOfLadingToExcel(data);
  }

  setSelectedBOLId(BOLId) {
    this.props.navigate(`/bill-of-ladings/details/${BOLId}`);
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
      <BOLDetailContext.Provider
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
      </BOLDetailContext.Provider>
    );
  }
}

const connectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(BOLDetailProvider);
export default withNavigation(connectedComponent);
