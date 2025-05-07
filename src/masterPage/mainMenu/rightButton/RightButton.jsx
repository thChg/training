import React, { Component } from "react";
import classes from "../../../css/masterPage/mainMenu/RightButton.module.css";
import { FaBell } from "react-icons/fa6";
import NotificationDropdown from "./NotificationDropdown";
import UserDropdown from "./UserDropdown";
import {
  mapDispatchToProps,
  mapStateToProps,
} from "../../auth/AuthenticationMap";
import { connect } from "react-redux";

export class RightButton extends Component {
  constructor(props) {
    super(props);
    this.wrapperRef = React.createRef();
    this.notificationIconRef = React.createRef();
    this.userIconRef = React.createRef();
    this.notificationDropdownRef = React.createRef();
    this.userDropdownRef = React.createRef();

    this.state = {
      isNotificationOpen: false,
      isUserOpen: false,
      notificationDropdownPosition: {},
      userDropdownPosition: {},
      dummyData: [
        {
          id: 1,
          description: "This is the first notification",
          resolved: false,
        },
        {
          id: 2,
          description: "This is the second notification",
          resolved: false,
        },
        {
          id: 3,
          description: "This is the third notification",
          resolved: true,
        },
      ],
    };

    this.handleResolveNotification = this.handleResolveNotification.bind(this);
    this.handleNotificationClickOutside =
      this.handleNotificationClickOutside.bind(this);
    this.getNotificationDropdownPosition =
      this.getNotificationDropdownPosition.bind(this);
    this.getUserDropdownPosition = this.getUserDropdownPosition.bind(this);
    this.handleBellClick = this.handleBellClick.bind(this);
    this.handleUserClick = this.handleUserClick.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside(event) {
    this.handleNotificationClickOutside(event);
    this.handleUserClickOutside(event);
  }

  getNotificationDropdownPosition() {
    if (!this.notificationIconRef?.current) return {};

    const rect = this.notificationIconRef.current.getBoundingClientRect();
    return {
      position: "absolute",
      top: rect.bottom + 5,
      left: rect.right - 300,
      zIndex: 9999,
    };
  }

  getUserDropdownPosition() {
    if (!this.userIconRef?.current) return {};

    const rect = this.userIconRef.current.getBoundingClientRect();
    return {
      position: "absolute",
      top: rect.bottom + 5,
      left: rect.right - 200,
      zIndex: 9999,
    };
  }

  handleNotificationClickOutside(event) {
    if (!this.state.isNotificationOpen) return;

    const insideButton = this.wrapperRef.current?.contains(event.target);
    const insideDropdown = this.notificationDropdownRef.current?.contains(
      event.target
    );

    if (!insideButton && !insideDropdown) {
      this.setState({ isNotificationOpen: false });
    }
  }

  handleUserClickOutside(event) {
    if (!this.state.isUserOpen) return;

    const insideButton = this.wrapperRef.current?.contains(event.target);
    const insideDropdown = this.userDropdownRef.current?.contains(event.target);

    if (!insideButton && !insideDropdown) {
      this.setState({ isUserOpen: false });
    }
  }

  handleBellClick() {
    const isOpening = !this.state.isNotificationOpen;
    this.setState({
      isNotificationOpen: isOpening,
      isUserOpen: false,
      notificationDropdownPosition: isOpening
        ? this.getNotificationDropdownPosition()
        : {},
    });
  }

  handleUserClick() {
    const isOpening = !this.state.isUserOpen;
    this.setState({
      isUserOpen: isOpening,
      isNotificationOpen: false,
      userDropdownPosition: isOpening ? this.getUserDropdownPosition() : {},
    });
  }

  handleLogout() {
    this.props.handleLogout();
  }

  handleResolveNotification(id) {
    // send a request to the server to resolve the notification
    // update the state to reflect the resolved notification
    console.log(id);
  }

  render() {
    return (
      <div className={classes.container}>
        <div className={classes.notificationContainer} ref={this.wrapperRef}>
          <div
            className={classes.notificationIcon}
            onClick={this.handleBellClick}
            ref={this.notificationIconRef}
          >
            <FaBell className={classes.notificationIcon}></FaBell>
            <div className={classes.notificationCount}>3</div>
          </div>
          {this.state.isNotificationOpen && (
            <NotificationDropdown
              notifications={this.state.dummyData}
              onResolve={this.handleResolveNotification}
              dropdownStyle={this.state.notificationDropdownPosition}
              ref={this.notificationDropdownRef}
            />
          )}
        </div>
        <div className={classes.userContainer}>
          <div className={classes.username}>{this.props.user.username}</div>
          <div
            className={classes.userIcon}
            onClick={this.handleUserClick}
            ref={this.userIconRef}
          >
            <img
              src="https://www.w3schools.com/howto/img_avatar.png"
              alt="User Avatar"
              className={classes.avatar}
            />
          </div>
          {this.state.isUserOpen && (
            <UserDropdown
              user={this.props.user}
              dropdownStyle={this.state.userDropdownPosition}
              ref={this.userDropdownRef}
              onLogout={this.handleLogout}
            />
          )}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RightButton);
