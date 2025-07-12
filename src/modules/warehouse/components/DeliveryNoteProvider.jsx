import React, { Component } from "react";
import { connect } from "react-redux";
import {
  mapStateToProps,
  mapDispatchToProps,
} from "../containers/DeliveryNoteMap";
import { formatDate } from "../../../masterPage/utils/TimeFormat";
import { withNavigation } from "../../user/functions/withNavigation";
// import { exportDeliveryNoteToExcel } from "../functions/exportDeliveryNoteToExcel.js";

export const DeliveryNoteContext = React.createContext();

export class DeliveryNoteProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "Delivery Note Management",
      columns: [
        "name",
        "customer",
        "address",
        "createdAt",
        "deliveryDate",
        "status",
      ],
      loading: this.props.loading,
      searchResult: [],
      permissions: this.props.permissions.reduce((accumulator, permission) => {
        if (permission.includes("employee")) {
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
    this.handleSelect = this.handleSelect.bind(this);
    this.setSelectedRecords = this.setSelectedRecords.bind(this);
    this.toggleCreateModalVisible = this.toggleCreateModalVisible.bind(this);
  }

  async componentDidMount() {
    const { deliveryNoteList, fetchRecordList } = this.props;
    const { currentPage, recordPerPage } = this.state;
    if (deliveryNoteList.length <= 0) {
      await fetchRecordList(currentPage, recordPerPage);
    }
    this.setState({
      searchResult: this.props.deliveryNoteList.map((record) => ({
        _id: record._id,
        name: record.name,
        customer: record.customer.fullname,
        address: record.deliveryAddress,
        createdAt: formatDate(record.createdAt).split(" ")[0],
        deliveryDate: formatDate(record.estimatedDeliveryDate).split(" ")[0],
        status: record.status,
      })),
      recordLength: this.props.recordLength,
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.deliveryNoteList !== this.props.deliveryNoteList) {
      this.setState({
        searchResult: this.props.deliveryNoteList.map((record) => ({
          _id: record._id,
          name: record.name,
          customer: record.customer.fullname,
          address: record.deliveryAddress,
          createdAt: formatDate(record.createdAt).split(" ")[0],
          deliveryDate: formatDate(record.estimatedDeliveryDate).split(" ")[0],
          status: record.status,
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
    const { deliveryNoteList } = this.props;

    const result = searchTerm
      ? deliveryNoteList.filter((record) =>
          record.name.toLowerCase().includes(searchTerm)
        )
      : deliveryNoteList;
    this.setState({
      searchResult: result.map((record) => ({
        _id: record._id,
        name: record.name,
        customer: record.customer.fullname,
        address: record.deliveryAddress,
        createdAt: formatDate(record.createdAt).split(" ")[0],
        deliveryDate: formatDate(record.estimatedDeliveryDate).split(" ")[0],
        status: record.status,
      })),
    });
  }

  async exportToExcel() {
    const { selectedRecords } = this.state;
    if (selectedRecords.length === 0) return;
    const data = await this.props.fetchRecordData(selectedRecords);

    // await exportDeliveryNoteToExcel(data);
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

  handleSelect(id) {
    this.props.navigate(`/delivery-notes/details/${id}`);
  }

  render() {
    return (
      <DeliveryNoteContext.Provider
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
          toggleCreateModalVisible: this.toggleCreateModalVisible,
        }}
      >
        {this.props.children}
      </DeliveryNoteContext.Provider>
    );
  }
}

const connectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeliveryNoteProvider);

export default withNavigation(connectedComponent);
