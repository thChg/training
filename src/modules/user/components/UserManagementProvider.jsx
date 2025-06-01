import React, { Component } from "react";
import { connect } from "react-redux";
import {
  mapDispatchToProps,
  mapStateToProps,
} from "../containers/UserManagementMap";
import { formatDate } from "../../../masterPage/utils/TimeFormat";

export const UserManagementContext = React.createContext();

export class UserManagemnetProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "User Management",
      menu: "users",
      columns: ["username", "role", "apartment", "createdAt"],
      searchResult: [],
      createModalVisible: false,
      selectedUserId: null,
      loading: this.props.loading || false,
      permissions: this.props.permissions || [],
    };

    this.onSearch = this.onSearch.bind(this);
    this.onCreate = this.onCreate.bind(this);
    this.onCreateFinish = this.onCreateFinish.bind(this);
    this.setSelectedUserId = this.setSelectedUserId.bind(this);
  }

  async componentDidMount() {
    if (this.props.userList.length <= 0) {
      await this.props.fetchUserList();
    }
    if (this.props.roleList.length <= 0) {
      await this.props.fetchRoleList();
    }
    if (this.props.accessList.length <= 0) {
      await this.props.fetchAccessList();
    }
    
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

  render() {
    return (
      <UserManagementContext.Provider
        value={{
          ...this.state,
          onSearch: this.onSearch,
          onCreate: this.onCreate,
          onCreateFinish: this.onCreateFinish,
          setSelectedUserId: this.setSelectedUserId,
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
)(UserManagemnetProvider);
