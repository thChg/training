import React, { Component } from "react";
import { connect } from "react-redux";
import {
  mapDispatchToProps,
  mapStateToProps,
} from "../containers/UserManagementMap";
import { formatDate } from "../../../masterPage/utils/TimeFormat";
import { exportUserToExcel } from "../functions/exportUserToExcel";

export const UserManagementContext = React.createContext();

export class UserManagementProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "User Management",
      columns: ["username", "role", "apartment", "createdAt"],
      searchResult: [],
      createModalVisible: false,
      selectedUserId: null,
      loading: this.props.loading || false,
      permissions: this.props.permissions.reduce((accumulator, permission) => {
        if (permission.includes("users")) {
          return [...accumulator, permission.split(":")[1].slice(0, -1)];
        }
        return accumulator;
      }, []),
      recordLength: this.props.recordLength || 0,
      recordPerPage: 10,
      currentPage: 1,
      selectedRecords: [],
    };

    this.onSearch = this.onSearch.bind(this);
    this.onCreate = this.onCreate.bind(this);
    this.onCreateFinish = this.onCreateFinish.bind(this);
    this.setSelectedUserId = this.setSelectedUserId.bind(this);
    this.setCurrentPage = this.setCurrentPage.bind(this);
    this.setRecordPerPage = this.setRecordPerPage.bind(this);
    this.setSelectedRecords = this.setSelectedRecords.bind(this);
    this.handleDeleteRecords = this.handleDeleteRecords.bind(this);
    this.removeFromSelectedRecords = this.removeFromSelectedRecords.bind(this);
    this.printSelectedRecords = this.printSelectedRecords.bind(this);
    this.exportToExcel = this.exportToExcel.bind(this);
  }

  async componentDidMount() {
    const { fetchUserList, fetchRoleList, userList, roleList } = this.props;
    const { currentPage, recordsPerPage } = this.state;
    if (userList.length <= 0) {
      await fetchUserList(currentPage, recordsPerPage);
    }
    if (roleList.length <= 0) {
      await fetchRoleList();
    }

    this.setState({
      searchResult: this.props.userList.map((element) => ({
        _id: element._id,
        username: element.username,
        role: element.role.role,
        apartment: element.apartment,
        createdAt: formatDate(element.createdAt),
      })),
      recordLength: this.props.recordLength,
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userList !== this.props.userList) {
      this.setState({
        searchResult: this.props.userList.map((element) => ({
          _id: element._id,
          username: element.username,
          role: element.role.role,
          apartment: element.apartment,
          createdAt: formatDate(element.createdAt),
        })),
      });
    }
  }

  onSearch(searchTerm) {
    const userList = this.props.userList;

    const result = searchTerm
      ? userList.filter((user) =>
          user.username.toLowerCase().includes(searchTerm)
        )
      : userList;

    this.setState({
      searchResult: result.map((element) => ({
        _id: element._id,
        username: element.username,
        role: element.role.role,
        apartment: element.apartment,
        createdAt: formatDate(element.createdAt),
      })),
    });
  }

  onCreate() {
    this.setState({ createModalVisible: true });
  }

  onCreateFinish() {
    this.setState({ createModalVisible: false });
  }

  setSelectedUserId(userId) {
    this.setState({ selectedUserId: userId });
  }

  setCurrentPage(page) {
    this.setState({ currentPage: page });
    this.props.fetchUserList(page, this.state.recordPerPage);
  }

  setRecordPerPage(recordPerPage) {
    this.setState({ recordPerPage, currentPage: 1 });
    this.props.fetchUserList(1, recordPerPage);
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

  async exportToExcel() {
    const { selectedRecords } = this.state;
    const data = await this.props.fetchSelectedUserData(selectedRecords);
    console.log(data);
    const filtered = data.map((user) => ({
      username: user.username,
      role: user.role.role,
      apartment: user.apartment,
    }));
    await exportUserToExcel(filtered);
  }

  printSelectedRecords() {
    const { selectedRecords } = this.state;
    this.props.printRecords(selectedRecords);
  }

  handleDeleteRecords() {
    const { selectedRecords, currentPage, recordPerPage } = this.state;
    this.props.deleteManyUsers(selectedRecords, currentPage, recordPerPage);
    this.setState({ selectedRecords: [] });
  }

  render() {
    return (
      <UserManagementContext.Provider
        value={{
          ...this.state,
          onSearch: this.onSearch,
          onCreate: this.onCreate,
          onCreateFinish: this.onCreateFinish,
          setSelectedUserId: this.setSelectedUserId,
          setCurrentPage: this.setCurrentPage,
          setRecordPerPage: this.setRecordPerPage,
          setSelectedRecords: this.setSelectedRecords,
          handleDeleteRecords: this.handleDeleteRecords,
          removeFromSelectedRecords: this.removeFromSelectedRecords,
          printSelectedRecords: this.printSelectedRecords,
          exportToExcel: this.exportToExcel,
        }}
      >
        {this.props.children}
      </UserManagementContext.Provider>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserManagementProvider);
