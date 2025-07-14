import React, { Component } from "react";
import { connect } from "react-redux";
import {
  mapDispatchToProps,
  mapStateToProps,
} from "../containers/SOApproveMap";
import { withNavigation } from "../../user/functions/withNavigation";
// import { exportProductToExcel } from "../functions/exportProductToExcel";

export const SOApproveContext = React.createContext();

class SOApproveProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "Sale Order Management",
      columns: ["name", "orderDate", "customer", "email", "contact", "status"],
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
      createModalVisible: false,
      selectedSaleOrderId: null,
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.exportToExcel = this.exportToExcel.bind(this);
    this.setRecordPerPage = this.setRecordPerPage.bind(this);
    this.setCurrentPage = this.setCurrentPage.bind(this);
    this.handleDeleteRecords = this.handleDeleteRecords.bind(this);
    this.removeFromSelectedRecords = this.removeFromSelectedRecords.bind(this);
    this.printSelectedRecords = this.printSelectedRecords.bind(this);
    this.setSelectedSaleOrderId = this.setSelectedSaleOrderId.bind(this);
    this.setSelectedRecords = this.setSelectedRecords.bind(this);
    this.toggleCreateModalVisible = this.toggleCreateModalVisible.bind(this);
  }

  async componentDidMount() {
    const { saleOrderList, fetchSaleOrderList } = this.props;
    const { currentPage, recordPerPage } = this.state;

    if (saleOrderList.length <= 0) {
      await fetchSaleOrderList(currentPage, recordPerPage);
    }
    this.setState({
      searchResult: this.props.saleOrderList.map((saleOrder) => ({
        _id: saleOrder._id,
        name: saleOrder.name,
        status: saleOrder.status,
        orderDate: saleOrder.orderDate,
        customer: saleOrder.customer.fullname,
        email: saleOrder.customer.email,
        contact: saleOrder.customer.phone,
      })),
      recordLength: this.props.recordLength,
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.saleOrderList !== this.props.saleOrderList) {
      this.setState({
        searchResult: this.props.saleOrderList.map((saleOrder) => ({
          _id: saleOrder._id,
          name: saleOrder.name,
          status: saleOrder.status,
          orderDate: saleOrder.orderDate,
          customer: saleOrder.customer.fullname,
          email: saleOrder.customer.email,
          contact: saleOrder.customer.phone,
        })),
        recordLength: this.props.recordLength,

      });
    }
  }

  toggleCreateModalVisible() {
    this.setState((prevState) => ({
      createModalVisible: !prevState.createModalVisible,
    }));
  }

  handleSearch(searchTerm) {
    const saleOrderList = this.props.saleOrderList;

    const result = searchTerm
      ? saleOrderList.filter((saleOrder) =>
          saleOrder.name.toLowerCase().includes(searchTerm)
        )
      : saleOrderList;
    this.setState({
      searchResult: result.map((saleOrder) => ({
        _id: saleOrder._id,
        name: saleOrder.name,
        status: saleOrder.status,
        orderDate: saleOrder.orderDate,
        customer: saleOrder.customer.fullname,
        email: saleOrder.customer.email,
        contact: saleOrder.customer.phone,
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
    this.props.fetchSaleOrderList(1, recordPerPage);
  }
  setCurrentPage(page) {
    this.setState({ currentPage: page });
    this.props.fetchSaleOrderList(page, this.state.recordPerPage);
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

  setSelectedSaleOrderId(saleOrderId) {
    this.setState({ selectedSaleOrderId: saleOrderId });
    this.props.navigate(`/so-approve/details/${saleOrderId}`);
  }

  render() {
    return (
      <SOApproveContext.Provider
        value={{
          ...this.state,
          handleSearch: this.handleSearch,
          exportToExcel: this.exportToExcel,
          setRecordPerPage: this.setRecordPerPage,
          setCurrentPage: this.setCurrentPage,
          handleDeleteRecords: this.handleDeleteRecords,
          removeFromSelectedRecords: this.removeFromSelectedRecords,
          printSelectedRecords: this.printSelectedRecords,
          setSelectedSaleOrderId: this.setSelectedSaleOrderId,
          setSelectedRecords: this.setSelectedRecords,
          toggleCreateModalVisible: this.toggleCreateModalVisible,
        }}
      >
        {this.props.children}
      </SOApproveContext.Provider>
    );
  }
}

const connectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(SOApproveProvider);
export default withNavigation(connectedComponent);
