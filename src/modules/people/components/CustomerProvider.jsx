import React, { Component } from "react";
import { connect } from "react-redux";
import { mapDispatchToProp, mapStateToProps } from "../containers/CustomerMap";
import { formatDate } from "../../../masterPage/utils/TimeFormat";
import exceljs from "exceljs";
import { exportCustomerToExcel } from "../functions/exportCustomerToExcel";

export const CustomerContext = React.createContext();

export class CustomerProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "Customer Management",
      columns: ["fullname", "email", "company", "phone"],
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
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.exportToExcel = this.exportToExcel.bind(this);
    this.setRecordPerPage = this.setRecordPerPage.bind(this);
    this.setCurrentPage = this.setCurrentPage.bind(this);
    this.handleDeleteRecords = this.handleDeleteRecords.bind(this);
    this.removeFromSelectedRecords = this.removeFromSelectedRecords.bind(this);
    this.printSelectedRecords = this.printSelectedRecords.bind(this);
    this.setSelectedCustomerId = this.setSelectedCustomerId.bind(this);
    this.setSelectedRecords = this.setSelectedRecords.bind(this);
    this.toggleCreateModalVisible = this.toggleCreateModalVisible.bind(this);
  }

  async componentDidMount() {
    const { customerList, fetchCustomerList } = this.props;
    const { currentPage, recordPerPage } = this.state;
    if (customerList.length <= 0) {
      await fetchCustomerList(currentPage, recordPerPage);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.customerList !== this.props.customerList) {
      this.setState({
        searchResult: this.props.customerList.map((customer) => ({
          _id: customer._id,
          fullname: customer.fullname,
          email: customer.email,
          company: customer.company,
          phone: customer.phone,
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
    const customerList = this.props.customerList;

    const result = searchTerm
      ? customerList.filter((customer) =>
          customer.fullname.toLowerCase().includes(searchTerm)
        )
      : customerList;
    this.setState({
      searchResult: result.map((element) => ({
        _id: element._id,
        fullname: element.fullname,
        email: element.email,
        company: element.company,
        phone: element.phone,
      })),
    });
  }

  async exportToExcel() {
    const { selectedRecords } = this.state;
    const data = await this.props.fetchCustomerData(selectedRecords);

    await exportCustomerToExcel(data);
  }

  setRecordPerPage(recordPerPage) {
    this.setState({ recordPerPage, currentPage: 1 });
    this.props.fetchCustomerList(1, recordPerPage);
  }
  setCurrentPage(page) {
    this.setState({ currentPage: page });
    this.props.fetchCustomerList(page, this.state.recordPerPage);
  }

  handleDeleteRecords() {
    const { selectedRecords, currentPage, recordPerPage } = this.state;
    this.props.deleteManyCustomer(selectedRecords, currentPage, recordPerPage);
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

  setSelectedCustomerId(customerId) {
    this.setState({ selectedCustomerId: customerId });
  }

  render() {
    return (
      <CustomerContext.Provider
        value={{
          ...this.state,
          handleSearch: this.handleSearch,
          exportToExcel: this.exportToExcel,
          setRecordPerPage: this.setRecordPerPage,
          setCurrentPage: this.setCurrentPage,
          handleDeleteRecords: this.handleDeleteRecords,
          removeFromSelectedRecords: this.removeFromSelectedRecords,
          printSelectedRecords: this.printSelectedRecords,
          setSelectedCustomerId: this.setSelectedCustomerId,
          setSelectedRecords: this.setSelectedRecords,
          toggleCreateModalVisible: this.toggleCreateModalVisible,
        }}
      >
        {this.props.children}
      </CustomerContext.Provider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProp)(CustomerProvider);
