import React, { Component } from "react";
import { Link } from "react-router-dom";
import classes from "../../css/modules/components/TableBody.module.css";
import _ from "lodash";

export class TableBody extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }
  
  handleCheckboxChange(event) {
    const record = event.target.value;
    const self = this.context.self;

    self.setState((prevState) => {
      const { selectedRecords } = prevState.data;
      if (selectedRecords.includes(record)) {
        return {
          data: {
            ...prevState.data,
            selectedRecords: selectedRecords.filter(
              (element) => element !== record
            ),
          },
        };
      }
      return {
        data: {
          ...prevState.data,
          selectedRecords: [...selectedRecords, record],
        },
      };
    });
  }

  render() {
    const { self } = this.context;
    const {
      title,
      currentPage,
      recordPerPage,
      selectedRecords,
      searchResult,
      objectList,
    } = self.state.data;
    const path = window.location.pathname;

    const renderData = searchResult ? searchResult : objectList;
    
    return (
      <tbody>
        {renderData.map((row, index) => (
          <tr key={row._id}>
            <td style={{ textAlign: "center" }}>
              {(currentPage - 1) * recordPerPage + index + 1}
            </td>
            <td style={{ textAlign: "center" }}>
              <input
                type="checkbox"
                value={row._id}
                onChange={this.handleCheckboxChange}
                checked={selectedRecords.includes(row._id)}
              />
            </td>
            {title.map((col) => {
              const value = row[_.camelCase(col.titleName)];
              return (
                <td key={col.titleName}>
                  {col.clickable ? (
                    <Link to={`${path}/${row._id}`} className={classes.link}>
                      {value}
                    </Link>
                  ) : (
                    value
                  )}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
