import React, { Component } from "react";
import classes from "../../css/masterPage/subMenu/SubMenu.module.css";
import PageContext from "../utils/PageContext";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "./SubMenuMap";
import { PiMagnifyingGlass } from "react-icons/pi";
import _ from "lodash";

export class SubMenu extends Component {
  static contextType = PageContext;

  constructor(props) {
    super(props);

    this.state = {
      query: "",
      functionList: [],
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.renderFunctions = this.renderFunctions.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      query: event.target.value,
    });
  }

  renderFunctions() {
    const { userData } = this.props;
    const { query } = this.state;
    const { currentModule } = this.context;
    const parentFuncComparator = `#${_.kebabCase(currentModule)}`;
    
    const parentFunc = userData.functionList.filter(
      (f) => f.moduleName === currentModule && f.functionUrl.includes(parentFuncComparator)
    );
    return parentFunc
      .map((pf) => {
        return {
          parentFunc: pf.functionName,
          functions: userData.functionList.filter(
            (f) => f.parentUrl === pf.functionUrl
          ),
        };
      })
      .sort((a, b) => a.functionOrder - b.functionOrder)
      .map((func) => {
        return (
          <div className={classes.functionContainer} key={func.parentFunc}>
            {<div className={classes.parentFunction}>{func.parentFunc}</div>}
            {func.functions
              .filter((f) => f.functionName.toLowerCase().includes(query))
              .map((f) => (
                <Link
                  className={classes.item}
                  key={f.functionName}
                  to={f.functionUrl}
                >
                  {f.functionName}
                </Link>
              ))}
          </div>
        );
      });
  }

  render() {
    return (
      <div className={classes.container}>
        <div className={classes.searchBarContainer}>
          <input
            type="text"
            onChange={this.handleInputChange}
            className={classes.searchBar}
          />
          <PiMagnifyingGlass className={classes.icon} />
        </div>
        {this.renderFunctions()}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubMenu);
