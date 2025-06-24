import React, { Component } from "react";
import classes from "../../css/modules/components/ListSearchResult.module.css";
export class ListSearchResult extends Component {
  constructor(props) {
    super(props);

    this.state = {
      OD: this.props.recordPerPage * (this.props.currentPage - 1) + 1,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleSelectRecord = this.handleSelectRecord.bind(this);
    this.isHeaderChecked = this.isHeaderChecked.bind(this);
  }

  handleClick(event) {
    this.props.onSelect(event.currentTarget.dataset.id);
  }

  handleSelectRecord(event) {
    const { value, checked } = event.target;
    const { header } = event.currentTarget.dataset;
    this.props.onSelectRecord(value, !checked, header);
  }

  isHeaderChecked() {
    const { data, selectedRecords } = this.props;

    if (selectedRecords.length <= 0) return false;

    const dataId = data.map((element) => element._id);
    return dataId.every((element) => selectedRecords.includes(element));
  }

  render() {
    const {
      columns,
      data,
      loading,
      recordPerPage,
      currentPage,
      selectedRecords,
    } = this.props;
    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div className={classes.scrollContainer}>
        <table className={classes.container}>
          <thead>
            <tr>
              <th className={classes.OD}>OD</th>
              <th className={classes.checkboxContainer}>
                <input
                  type="checkbox"
                  className={classes.checkbox}
                  data-header={true}
                  checked={this.isHeaderChecked()}
                  onClick={this.handleSelectRecord}
                />
              </th>
              {columns.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((element, index) => {
              return (
                <tr
                  key={element._id}
                  data-id={element._id}
                  style={{ cursor: "pointer" }}
                >
                  <td className={classes.OD}>
                    {index + 1 + recordPerPage * (currentPage - 1)}
                  </td>
                  <td className={classes.checkboxContainer}>
                    {
                      <input
                        type="checkbox"
                        className={classes.checkbox}
                        checked={selectedRecords.includes(element._id)}
                        onChange={this.handleSelectRecord}
                        value={element._id}
                        data-isHeader={false}
                      />
                    }
                  </td>
                  {columns.map((column) => (
                    <td
                      key={column}
                      onClick={this.handleClick}
                      data-id={element._id}
                    >
                      {element[column]}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ListSearchResult;
