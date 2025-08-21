import React, { Component } from "react";
import { PiMagnifyingGlass } from "react-icons/pi";
import classes from "../../css/modules/components/SearchBar.module.css";
import _ from "lodash";

export class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: "",
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }

  handleSearch(event) {
    const searchTerm = event.target.value;

    this.setState({ searchTerm });
  }

  handleFilter(event) {
    const self = this.context.self;

    const value = event.currentTarget.dataset.value;
    const { searchTerm } = this.state;
    const { objectList } = self.state.data;

    self.setState((prevState) => ({
      data: {
        ...prevState.data,
        searchResult: objectList.filter((row) => row[value].includes(searchTerm)),
      },
    }));

    this.setState({
      searchTerm: "",
    });
  }

  render() {
    if (!this.context?.self) return null;
    const { searchTerm } = this.state;

    const { data } = this.context.self.state;

    const { title } = data;

    return (
      <div className={classes.container}>
        <input
          type="text"
          className={classes.input}
          onChange={this.handleSearch}
          placeholder="Search records by"
          value={searchTerm}
        />
        <PiMagnifyingGlass className={classes.icon} />
        {searchTerm.length > 0 && (
          <div className={classes.dropdown} style={{ top: "45px" }}>
            {title
              .filter((col) => col.canQuery)
              .map((col) => (
                <div
                  className={classes.dropdownElement}
                  onClick={this.handleFilter}
                  data-value={_.camelCase(col.titleName)}
                  key={col.titleName}
                >
                  <b>{col.titleName}:</b> {searchTerm}
                </div>
              ))}
          </div>
        )}
      </div>
    );
  }
}

export default SearchBar;
