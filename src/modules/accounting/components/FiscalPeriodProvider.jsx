import React, { Component } from "react";
import { connect } from "react-redux";
import {
  mapDispatchToProps,
  mapStateToProps,
} from "../containers/FiscalPeriodMap";
import { NavigationWrapper } from "../../../masterPage/components/NavigationWrapper";
// import { exportProductToExcel } from "../functions/exportProductToExcel";

export const FiscalPeriodContext = React.createContext();

class FiscalPeriodProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "Fiscal Period Management",
      columns: ["openDate", "closeDate", "status"],
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
      selectedFiscalPeriodId: "",
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
    this.toggleCreateModalVisible = this.toggleCreateModalVisible.bind(this);
    this.closeFiscalPeriod = this.closeFiscalPeriod.bind(this);
    this.setSelectedFiscalPeriodId = this.setSelectedFiscalPeriodId.bind(this);
  }

  componentDidMount() {
    const { fiscalPeriodList, fetchFiscalPeriodList } = this.props;
    const { currentPage, recordPerPage } = this.state;

    if (fiscalPeriodList.length <= 0) {
      fetchFiscalPeriodList(currentPage, recordPerPage);
    }
    this.setState({
      searchResult: this.props.fiscalPeriodList.map((fiscalPeriod) => ({
        _id: fiscalPeriod._id,
        openDate: fiscalPeriod.openDate,
        closeDate: fiscalPeriod.closeDate,
        status: fiscalPeriod.status,
      })),
      recordLength: this.props.recordLength,
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.fiscalPeriodList !== this.props.fiscalPeriodList) {
      this.setState({
        searchResult: this.props.fiscalPeriodList.map((fiscalPeriod) => ({
          _id: fiscalPeriod._id,
          openDate: fiscalPeriod.openDate,
          closeDate: fiscalPeriod.closeDate,
          status: fiscalPeriod.status,
        })),
        recordLength: this.props.recordLength,
      });
    }
  }

  handleSearch(searchTerm) {
    const fiscalPeriodList = this.props.fiscalPeriodList;

    const result = searchTerm
      ? fiscalPeriodList.filter((fiscalPeriod) =>
          fiscalPeriod.name.toLowerCase().includes(searchTerm)
        )
      : fiscalPeriodList;
    this.setState({
      searchResult: result.map((fiscalPeriod) => ({
        _id: fiscalPeriod._id,
        openDate: fiscalPeriod.openDate,
        closeDate: fiscalPeriod.closeDate,
        status: fiscalPeriod.status,
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
    this.props.fetchFiscalPeriodList(1, recordPerPage);
  }
  setCurrentPage(page) {
    this.setState({ currentPage: page });
    this.props.fetchFiscalPeriodList(page, this.state.recordPerPage);
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

  handleSelect(id) {
    this.props.navigate(`/fiscal-period/details/${id}`);
  }

  handleCreate(openDate) {
    const { currentPage, recordPerPage } = this.state;
    this.props.createFiscalPeriod({ openDate }, currentPage, recordPerPage);

    this.toggleCreateModalVisible();
  }

  toggleCreateModalVisible() {
    this.setState((prevState) => ({
      createModalVisible: !prevState.createModalVisible,
    }));
  }

  closeFiscalPeriod(id) {
    const { currentPage, recordPerPage } = this.state;
    this.props.closeFiscalPeriod(id, currentPage, recordPerPage);
  }

  setSelectedFiscalPeriodId(id) {
    this.setState({
      selectedFiscalPeriodId: id,
    });
  }

  render() {
    return (
      <FiscalPeriodContext.Provider
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
          handleSelect: this.handleSelect,
          handleCreate: this.handleCreate,
          toggleCreateModalVisible: this.toggleCreateModalVisible,
          closeFiscalPeriod: this.closeFiscalPeriod,
          setSelectedFiscalPeriodId: this.setSelectedFiscalPeriodId,
        }}
      >
        {this.props.children}
      </FiscalPeriodContext.Provider>
    );
  }
}

const connectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(FiscalPeriodProvider);
export default NavigationWrapper(connectedComponent);
