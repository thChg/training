import React, { Component } from "react";
import classes from "./css/App.module.css";
import MainMenu from "./masterPage/mainMenu/MainMenu";
import SubMenu from "./masterPage/subMenu/SubMenu";
import PageProvider from "./masterPage/utils/PageProvider";
import AppRouter from "./modules/AppRouter";
import { connect, Provider } from "react-redux";
import Authentication from "./masterPage/auth/Authentication";
import {
  mapDispatchToProps,
  mapStateToProps,
} from "./masterPage/auth/AuthenticationMap";

export class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return this.props.user ? (
      <div className={classes.container}>
        <PageProvider>
          <MainMenu />
          <SubMenu />
        </PageProvider>
        <div className={classes.routes}>
          <AppRouter />
        </div>
      </div>
    ) : (
      <Authentication />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
