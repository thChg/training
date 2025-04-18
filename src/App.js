import React, { Component } from "react";
import logo from "./logo.svg";
import classes from "./css/App.module.css";
import MainMenu from "./masterPage/mainMenu/MainMenu";
import SubMenu from "./masterPage/subMenu/SubMenu";
import PageProvider from "./masterPage/utils/PageProvider";
import { Route, Routes } from "react-router-dom";
import AppRouter from "./modules/AppRouter";
import { Provider } from "react-redux";
import { store } from "./modules/rootReducer";

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
        <Provider store={store}>
          <div className={classes.routes}>
            <AppRouter />
          </div>
        </Provider>
      </div>
    );
  }
}

export default App;
