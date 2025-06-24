import React, { Component } from "react";
import { connect } from "react-redux";
import {
  mapDispatchToProps,
  mapStateToProps,
} from "../containers/RoleManagementMap";
import { formatDate } from "../../../masterPage/utils/TimeFormat";
import { withNavigation } from "../functions/withNavigation";

export const RoleManagementContext = React.createContext();

export class RoleManagementProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "Role Management",
      columns: ["role", "createdAt"],
      searchResult: [],
      createModalVisible: false,
      permissions: this.props.permissions.reduce((accumulator, permission) => {
        if (permission.includes("users")) {
          return [...accumulator, permission.split(":")[1].slice(0, -1)];
        }
        return accumulator;
      }, []),
      currentPage: 1,
      recordLength: props.recordLength || 0,
      recordPerPage: 10,
      selectedRecords: [],
    };

    this.onSearch = this.onSearch.bind(this);
    this.onCreate = this.onCreate.bind(this);
    this.onCreateFinish = this.onCreateFinish.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.setCurrentPage = this.setCurrentPage.bind(this);
    this.setRecordPerPage = this.setRecordPerPage.bind(this);
    this.setSelectedRecords = this.setSelectedRecords.bind(this);
    this.removeFromSelectedRecords = this.removeFromSelectedRecords.bind(this);
    this.handleDeleteRecords = this.handleDeleteRecords.bind(this);
  }

  async componentDidMount() {
    const { fetchRoleList, fetchAccessList, roleList, accessList } = this.props;
    const { currentPage, recordPerPage } = this.state;
    if (roleList.length <= 0) {
      await fetchRoleList(currentPage, recordPerPage);
    }
    if (accessList.length <= 0) {
      await fetchAccessList();
    }
    this.setState({
      searchResult: this.props.roleList.map((element) => ({
        _id: element._id,
        role: element.role,
        createdAt: formatDate(element.createdAt),
      })),
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.roleList !== this.props.roleList) {
      this.setState({
        searchResult: this.props.roleList.map((element) => ({
          _id: element._id,
          role: element.role,
          createdAt: formatDate(element.createdAt),
        })),
      });
    }
  }

  onCreate() {
    this.setState({ createModalVisible: true });
  }

  onCreateFinish() {
    this.setState({ createModalVisible: false });
  }

  onSearch(searchTerm) {
    const roleList = this.props.roleList;

    const result = searchTerm
      ? roleList.filter((role) =>
          role.role.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : roleList;

    this.setState({
      searchResult: result.map((element) => ({
        _id: element._id,
        role: element.role,
        access: element.access.map((access) => access.menu),
        permissions: element.permissions.map((permission) => permission.name),
        createdAt: formatDate(element.createdAt),
      })),
    });
  }

  onSelect(roleId) {
    console.log(this.props.setSelectedRole);
    this.props.setSelectedRole(roleId);
    this.props.navigate("/role-management/detail");
  }

  setCurrentPage(page) {
    this.setState({ currentPage: page });
    this.props.fetchRoleList(page, this.state.recordPerPage);
  }

  setRecordPerPage(recordPerPage) {
    this.setState({ recordPerPage: recordPerPage, currentPage: 1 });
    this.props.fetchRoleList(1, recordPerPage);
  }

  setSelectedRecords(record) {
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

  handleDeleteRecords() {
    const { selectedRecords, currentPage, recordPerPage } = this.state;
    this.props.deleteManyRoles(selectedRecords, currentPage, recordPerPage);
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
  
  render() {
    return (
      <RoleManagementContext.Provider
        value={{
          ...this.state,
          onSearch: this.onSearch,
          onCreate: this.onCreate,
          onCreateFinish: this.onCreateFinish,
          onSelect: this.onSelect,
          setCurrentPage: this.setCurrentPage,
          setRecordPerPage: this.setRecordPerPage,
          setSelectedRecords: this.setSelectedRecords,
          removeFromSelectedRecords: this.removeFromSelectedRecords,
          handleDeleteRecords: this.handleDeleteRecords,
        }}
      >
        {this.props.children}
      </RoleManagementContext.Provider>
    );
  }
}

const connectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(RoleManagementProvider);
export default withNavigation(connectedComponent);
