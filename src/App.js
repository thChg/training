import React, { Component } from "react";
import logo from "./logo.svg";
import classes from "./css/App.module.css";
import MainMenu from "./masterPage/mainMenu/MainMenu";
import SubMenu from "./masterPage/subMenu/SubMenu";
import PageProvider from "./masterPage/utils/PageProvider";
import { Route, Routes } from "react-router-dom";
import AppRouter from "./modules/AppRouter";

export class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={classes.container}>
        <PageProvider>
          <MainMenu />
          <SubMenu />
        </PageProvider>
        <div className={classes.routes}>
          <AppRouter/>
        </div>
      </div>
    );
  }
}

export default App;
