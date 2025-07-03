import React, { Component } from "react";
import { connect } from "react-redux";
import {
  mapDispatchToProps,
  mapStateToProps,
} from "../containers/SOApproveMap";
import { withNavigation } from "../../user/functions/withNavigation";
// import { exportProductToExcel } from "../functions/exportProductToExcel";

export const SOApproveDetailContext = React.createContext();

class SOApproveDetailProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: `Sal Order Details`,
      columns: [
        "orderName",
        "productName",
        "price",
        "quantity",
        "unit",
        "status",
      ],
      loading: this.props.loading,
      searchResult: [],
      permissions: this.props.permissions.reduce((accumulator, permission) => {
        if (permission.includes("accounting")) {
          return [...accumulator, permission.split(":")[1].slice(0, -1)];
        }
        return accumulator;
      }, []),
      selectedRecords: [],
      recordLength: this.props.recordLength,
      recordPerPage: 10,
      currentPage: 1,
      saleOrder: {},
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.exportToExcel = this.exportToExcel.bind(this);
    this.setRecordPerPage = this.setRecordPerPage.bind(this);
    this.setCurrentPage = this.setCurrentPage.bind(this);
    this.removeFromSelectedRecords = this.removeFromSelectedRecords.bind(this);
    this.printSelectedRecords = this.printSelectedRecords.bind(this);
    this.setSelectedRecords = this.setSelectedRecords.bind(this);
    this.handleApproveSO = this.handleApproveSO.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  async componentDidMount() {
    const { saleOrderList, fetchSalOrderList, params } = this.props;
    const { currentPage, recordPerPage } = this.state;

    if (saleOrderList.length <= 0) {
      await fetchSalOrderList(currentPage, recordPerPage);
    }

    const saleOrder = saleOrderList.find((po) => po._id == params.id);
    this.setState({
      title: `${saleOrder.name} details`,
      saleOrder: saleOrder,
      searchResult: saleOrder.products.map((product) => ({
        _id: product._id,
        orderName: saleOrder.name,
        productName: product.name,
        price: product.price,
        quantity: product.quantity,
        unit: product.unit,
        status: product.status,
      })),
    });
  }

  handleSearch(searchTerm) {
    const { saleOrder } = this.state;

    const result = searchTerm
      ? saleOrder.products.filter((product) =>
          product.name.toLowerCase().includes(searchTerm)
        )
      : saleOrder.products;
    this.setState({
      searchResult: result.map((product) => ({
        _id: product._id,
        orderName: saleOrder.name,
        productName: product.name,
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
    const data = await this.props.fetchProductData(selectedRecords);

    // await exportProductToExcel(data);
  }

  setRecordPerPage(recordPerPage) {
    this.setState({ recordPerPage, currentPage: 1 });
    this.props.fetchSalOrderList(1, recordPerPage);
  }
  setCurrentPage(page) {
    this.setState({ currentPage: page });
    this.props.fetchProductList(page, this.state.recordPerPage);
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

  handleApproveSO() {
    const { saleOrder } = this.state;
    if (saleOrder.status !== "pending") {
      return;
    }

    this.props.approveSO({ SOId: saleOrder._id });
    this.props.navigate("/so-approve");
  }

  handleSelect() {
    return;
  }

  render() {
    return (
      <SOApproveDetailContext.Provider
        value={{
          ...this.state,
          handleSearch: this.handleSearch,
          exportToExcel: this.exportToExcel,
          setRecordPerPage: this.setRecordPerPage,
          setCurrentPage: this.setCurrentPage,
          removeFromSelectedRecords: this.removeFromSelectedRecords,
          printSelectedRecords: this.printSelectedRecords,
          setSelectedRecords: this.setSelectedRecords,
          handleApproveSO: this.handleApproveSO,
          handleSelect: this.handleSelect,
        }}
      >
        {this.props.children}
      </SOApproveDetailContext.Provider>
    );
  }
}

const connectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(SOApproveDetailProvider);
export default withNavigation(connectedComponent);
