import React, { Component } from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProp } from "../containers/VendorMap";
import { formatDate } from "../../../masterPage/utils/TimeFormat";
import { exportVendorToExcel } from "../functions/exportVendorToExcel.js";

export const VendorContext = React.createContext();

export class VendorProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "Vendor Management",
      columns: ["name", "email", "address", "phone", "taxId"],
      loading: this.props.loading,
      searchResult: [],
      permissions: this.props.permissions.reduce((accumulator, permission) => {
        if (permission.includes("people")) {
          return [...accumulator, permission.split(":")[1].slice(0, -1)];
        }
        return accumulator;
      }, []),
      selectedRecords: [],
      recordLength: this.props.recordLength,
      recordPerPage: 10,
      currentPage: 1,
      createModalVisible: false,
      selectedRecordId: null,
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.exportToExcel = this.exportToExcel.bind(this);
    this.setRecordPerPage = this.setRecordPerPage.bind(this);
    this.setCurrentPage = this.setCurrentPage.bind(this);
    this.handleDeleteRecords = this.handleDeleteRecords.bind(this);
    this.removeFromSelectedRecords = this.removeFromSelectedRecords.bind(this);
    this.printSelectedRecords = this.printSelectedRecords.bind(this);
    this.setSelectedRecordId = this.setSelectedRecordId.bind(this);
    this.setSelectedRecords = this.setSelectedRecords.bind(this);
    this.toggleCreateModalVisible = this.toggleCreateModalVisible.bind(this);
  }

  async componentDidMount() {
    const { recordList, fetchRecordList } = this.props;
    const { currentPage, recordPerPage } = this.state;
    if (recordList.length <= 0) {
      await fetchRecordList(currentPage, recordPerPage);
    }
    this.setState({
      searchResult: recordList.map((record) => ({
        _id: record._id,
        name: record.name,
        email: record.email,
        address: record.address,
        phone: record.phone,
        taxId: record.taxId,
      })),
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.recordList !== this.props.recordList) {
      this.setState({
        searchResult: this.props.recordList.map((record) => ({
          _id: record._id,
          name: record.name,
          email: record.email,
          address: record.address,
          phone: record.phone,
          taxId: record.taxId,
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
    const recordList = this.props.recordList;

    const result = searchTerm
      ? recordList.filter((record) =>
          record.name.toLowerCase().includes(searchTerm)
        )
      : recordList;
    this.setState({
      searchResult: result.map((record) => ({
        _id: record._id,
        name: record.name,
        email: record.email,
        address: record.address,
        phone: record.phone,
        taxId: record.taxId,
      })),
    });
  }

  async exportToExcel() {
    const { selectedRecords } = this.state;
    if (selectedRecords.length === 0) return;
    const data = await this.props.fetchRecordData(selectedRecords);

    await exportVendorToExcel(data);
  }

  setRecordPerPage(recordPerPage) {
    this.setState({ recordPerPage, currentPage: 1 });
    this.props.fetchRecordList(1, recordPerPage);
  }
  setCurrentPage(page) {
    this.setState({ currentPage: page });
    this.props.fetchRecordList(page, this.state.recordPerPage);
  }

  handleDeleteRecords() {
    const { selectedRecords, currentPage, recordPerPage } = this.state;
    this.props.deleteManyRecord(selectedRecords, currentPage, recordPerPage);
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

  setSelectedRecordId(recordId) {
    this.setState({ selectedRecordId: recordId });
  }

  render() {
    return (
      <VendorContext.Provider
        value={{
          ...this.state,
          handleSearch: this.handleSearch,
          exportToExcel: this.exportToExcel,
          setRecordPerPage: this.setRecordPerPage,
          setCurrentPage: this.setCurrentPage,
          handleDeleteRecords: this.handleDeleteRecords,
          removeFromSelectedRecords: this.removeFromSelectedRecords,
          printSelectedRecords: this.printSelectedRecords,
          setSelectedRecordId: this.setSelectedRecordId,
          setSelectedRecords: this.setSelectedRecords,
          toggleCreateModalVisible: this.toggleCreateModalVisible,
        }}
      >
        {this.props.children}
      </VendorContext.Provider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProp)(VendorProvider);
