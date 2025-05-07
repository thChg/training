import React, { Component } from "react";
import classes from "../../css/masterPage/authentication/Authentication.module.css";
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "./AuthenticationMap";

export class Authentication extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit() {
    this.props.handleLogin({
      username: this.state.username,
      password: this.state.password,
    });
  }

  render() {
    return (
      <div className={classes.container}>
        <div className={classes.formContainer}>
          <div className={classes.title}>Website login</div>
          <div className={classes.inputContainer}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              required
              onChange={this.handleUsernameChange}
            />
          </div>
          <div className={classes.inputContainer}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              onChange={this.handlePasswordChange}
            />
          </div>
          <button
            type="submit"
            className={classes.loginButton}
            onClick={this.handleSubmit}
          >
            Login
          </button>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);
