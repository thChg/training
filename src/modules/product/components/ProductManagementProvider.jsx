import React, { Component } from "react";
import { connect } from "react-redux";
import { exportProductToExcel } from "../functions/exportProductToExcel";
import {
  mapDispatchToProps,
  mapStateToProps,
} from "../containers/ProductManagementMap";

export const ProductManagementContext = React.createContext();

class ProductManagementProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "Product Management",
      columns: ["name", "category", "description"],
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
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.exportToExcel = this.exportToExcel.bind(this);
    this.setRecordPerPage = this.setRecordPerPage.bind(this);
    this.setCurrentPage = this.setCurrentPage.bind(this);
    this.handleDeleteRecords = this.handleDeleteRecords.bind(this);
    this.removeFromSelectedRecords = this.removeFromSelectedRecords.bind(this);
    this.printSelectedRecords = this.printSelectedRecords.bind(this);
    this.setSelectedProductId = this.setSelectedProductId.bind(this);
    this.setSelectedRecords = this.setSelectedRecords.bind(this);
    this.toggleCreateModalVisible = this.toggleCreateModalVisible.bind(this);
  }

  async componentDidMount() {
    const { productList, fetchProductList } = this.props;
    const { currentPage, recordPerPage } = this.state;

    if (productList.length <= 0) {
      await fetchProductList(currentPage, recordPerPage);
    }
    this.setState({
      searchResult: this.props.productList.map((product) => ({
        _id: product._id,
        name: product.name,
        category: product.category,
        description: product.description,
      })),
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.productList !== this.props.productList) {
      this.setState({
        searchResult: this.props.productList.map((product) => ({
          _id: product._id,
          name: product.name,
          category: product.category,
          description: product.description,
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
    const productList = this.props.productList;

    const result = searchTerm
      ? productList.filter((product) =>
          product.name.toLowerCase().includes(searchTerm)
        )
      : productList;
    this.setState({
      searchResult: result.map((product) => ({
        _id: product._id,
        name: product.name,
        category: product.category,
        description: product.description,
      })),
    });
  }

  async exportToExcel() {
    const { selectedRecords } = this.state;
    if (selectedRecords.length === 0) return;
    const data = await this.props.fetchProductData(selectedRecords);

    await exportProductToExcel(data);
  }

  setRecordPerPage(recordPerPage) {
    this.setState({ recordPerPage, currentPage: 1 });
    this.props.fetchProductList(1, recordPerPage);
  }
  setCurrentPage(page) {
    this.setState({ currentPage: page });
    this.props.fetchProductList(page, this.state.recordPerPage);
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

  setSelectedProductId(productId) {
    this.setState({ selectedProductId: productId });
  }

  render() {
    return (
      <ProductManagementContext.Provider
        value={{
          ...this.state,
          handleSearch: this.handleSearch,
          exportToExcel: this.exportToExcel,
          setRecordPerPage: this.setRecordPerPage,
          setCurrentPage: this.setCurrentPage,
          handleDeleteRecords: this.handleDeleteRecords,
          removeFromSelectedRecords: this.removeFromSelectedRecords,
          printSelectedRecords: this.printSelectedRecords,
          setSelectedProductId: this.setSelectedProductId,
          setSelectedRecords: this.setSelectedRecords,
          toggleCreateModalVisible: this.toggleCreateModalVisible,
        }}
      >
        {this.props.children}
      </ProductManagementContext.Provider>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductManagementProvider);
