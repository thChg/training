import React, { Component } from "react";
import { connect } from "react-redux";
import {
  mapDispatchToProps,
  mapStateToProps,
} from "../containers/UserManagementMap";
import { formatDate } from "../../../masterPage/utils/TimeFormat";
import { withNavigation } from "../functions/withNavigation";

export const RoleManagementContext = React.createContext();

export class RoleManagementProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "Role Management",
      menu: "users",
      columns: ["role", "createdAt"],
      searchResult: [],
      createModalVisible: false,
      permissions: props.permissions
    };

    this.onSearch = this.onSearch.bind(this);
    this.onCreate = this.onCreate.bind(this);
    this.onCreateFinish = this.onCreateFinish.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  async componentDidMount() {
    if (this.props.roleList.length <= 0) {
      await this.props.fetchRoleList();
    }
    console.log(this.props.accessList.length <= 0);
    if (this.props.accessList.length <= 0) {
      await this.props.fetchAccessList();
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

  render() {
    return (
      <RoleManagementContext.Provider
        value={{
          ...this.state,
          onSearch: this.onSearch,
          onCreate: this.onCreate,
          onCreateFinish: this.onCreateFinish,
          onSelect: this.onSelect,
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
