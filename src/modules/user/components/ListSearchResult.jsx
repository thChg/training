import React, { Component } from "react";
import classes from "../../../css/modules/components/ListSearchResult.module.css";
import { connect } from "react-redux";
import {
  mapDispatchToProps,
  mapStateToProps,
} from "../containers/UserManagementMap";
import UserContext from "./UserContext";

export class ListSearchResult extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);

    this.state = {};
    this.handleClick = this.handleClick.bind(this);
    this.clickHandlers = {};
  }

  async componentDidMount() {
    await this.props.fetchUserList();
    this.context.setSearchResult(this.props.userList);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userList !== this.props.userList) {
      this.context.setSearchResult(this.props.userList);
    }
  }

  handleClick(userId) {
    this.props.setSelectedUserId(userId);
  }

  getClickHandler(userId) {
    if (!this.clickHandlers[userId]) {
      this.clickHandlers[userId] = () => {
        this.handleClick(userId);
      };
    }
    return this.clickHandlers[userId];
  }

  render() {
    if (this.props.loading) {
      return <div>Loading...</div>;
    }

    return (
      <table className={classes.container}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Role</th>
            <th>Apartment</th>
            <th>CreatedAt</th>
          </tr>
        </thead>
        <tbody>
          {this.context.searchResult.map((user) => (
            <tr
              key={user._id}
              onClick={this.getClickHandler(user._id)}
              style={{ cursor: "pointer" }}
            >
              <td>{user._id}</td>
              <td>{user.username}</td>
              <td>{user.role.role}</td>
              <td>{user.apartment}</td>
              <td>{user.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListSearchResult);
