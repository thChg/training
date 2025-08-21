import React, { Component } from "react";

const ThisContext = React.createContext({});

export class TableTitle extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.isChecked = this.isChecked.bind(this);
    this.setSelectedRecords = this.setSelectedRecords.bind(this);
  }

  setSelectedRecords(data) {
    const { self } = this.context;

    self.setState((prevState) => ({
      data: {
          ...prevState.data,
          selectedRecords: data,
      },
    }));
  }

  handleCheckboxChange(event) {
    const { self } = this.context;

    const { selectedRecords, objectList } = self.state.data;
  
    const currentPageIds = objectList.map((row) => row._id);
    const isChecked = event.target.checked;

    if (!isChecked) {
      const res = selectedRecords.filter(
        (record) => !currentPageIds.includes(record)
      );
      this.setSelectedRecords(res);
    } else {
      const res = selectedRecords.concat(currentPageIds);
      const set = new Set(res);
      const uniqueArray = [...set];

      this.setSelectedRecords(uniqueArray);
    }
  }

  isChecked() {
    const { self } = this.context;
    const { selectedRecords, objectList } = self.state.data;

    if (selectedRecords.length <= 0) return false;

    const ids = objectList.map((element) => element._id);
    return ids.every((element) => selectedRecords.includes(element));
  }

  render() {
    const { self } = this.context;
    const { title } = self.state.data;
    return (
      <ThisContext.Provider value={{ self }}>
        <thead>
          <tr>
            <th>Num.</th>
            <th>
              <input
                type="checkbox"
                checked={this.isChecked()}
                onChange={this.handleCheckboxChange}
              />
            </th>
            {title.map((t) => (
              <th key={t.titleName}>{t.titleName}</th>
            ))}
          </tr>
        </thead>
      </ThisContext.Provider>
    );
  }
}

export default TableTitle;
