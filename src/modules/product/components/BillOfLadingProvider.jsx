import React, { Component } from "react";
import { connect } from "react-redux";
// import { exportBillOfLadingToExcel } from "../functions/exportBillOfLadingToExcel";
import {
  mapDispatchToProps,
  mapStateToProps,
} from "../containers/BillOfLadingMap";
import { withNavigation } from "../../user/functions/withNavigation";
import { formatDate } from "../../../masterPage/utils/TimeFormat";

export const BillOfLadingContext = React.createContext();

class BillOfLadingProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "Bill Of Lading Management",
      columns: ["name", "vendor", "email", "contact", "createdAt"],
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
      pendingPurchaseOrderList: [],
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.exportToExcel = this.exportToExcel.bind(this);
    this.setRecordPerPage = this.setRecordPerPage.bind(this);
    this.setCurrentPage = this.setCurrentPage.bind(this);
    this.handleDeleteRecords = this.handleDeleteRecords.bind(this);
    this.removeFromSelectedRecords = this.removeFromSelectedRecords.bind(this);
    this.printSelectedRecords = this.printSelectedRecords.bind(this);
    this.setSelectedRecords = this.setSelectedRecords.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.setSelectedBOLId = this.setSelectedBOLId.bind(this);
  }

  async componentDidMount() {
    const {
      billOfLadingList,
      fetchBillOfLadingList,
      purchaseOrderList,
      fetchPurchaseOrderList,
    } = this.props;
    const { currentPage, recordPerPage } = this.state;

    if (billOfLadingList.length <= 0) {
      await fetchBillOfLadingList(currentPage, recordPerPage);
    }
    if (purchaseOrderList.length <= 0) {
      await fetchPurchaseOrderList();
    }
    this.setState({
      pendingPurchaseOrderList: this.props.purchaseOrderList.filter(
        (item) => item.status === "approved"
      ),
      searchResult: this.props.billOfLadingList.map((bol) => ({
        _id: bol._id,
        name: bol.name,
        vendor: bol.vendor.name,
        email: bol.vendor.email,
        contact: bol.vendor.phone,
        createdAt: formatDate(bol.createdAt),
      })),
      recordLength: this.props.recordLength,
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.billOfLadingList !== this.props.billOfLadingList) {
      this.setState({
        searchResult: this.props.billOfLadingList.map((bol) => ({
        _id: bol._id,
        name: bol.name,
        vendor: bol.vendor.name,
        email: bol.vendor.email,
        contact: bol.vendor.phone,
        createdAt: formatDate(bol.createdAt),
        })),
        recordLength: this.props.recordLength,
      });
    }
  }

  handleCreate() {
    this.props.navigate("/bill-of-ladings/create");
  }

  handleSearch(searchTerm) {
    const billOfLadingList = this.props.billOfLadingList;

    const result = searchTerm
      ? billOfLadingList.filter((product) =>
          product.name.toLowerCase().includes(searchTerm)
        )
      : billOfLadingList;
    this.setState({
      searchResult: result.map((bol) => ({
        _id: bol._id,
        name: bol.name,
        vendor: bol.vendor.name,
        email: bol.vendor.email,
        contact: bol.vendor.phone,
        createdAt: formatDate(bol.createdAt),
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

  render() {
    return (
      <BillOfLadingContext.Provider
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
          handleCreate: this.handleCreate,
          setSelectedBOLId: this.setSelectedBOLId,
        }}
      >
        {this.props.children}
      </BillOfLadingContext.Provider>
    );
  }
}

const connectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(BillOfLadingProvider);
export default withNavigation(connectedComponent);
