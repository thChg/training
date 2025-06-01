import React, { Component } from "react";
import classes from "../../css/modules/components/ListSearchResult.module.css";
export class ListSearchResult extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    console.log(event.currentTarget)
    this.props.onSelect(event.currentTarget.dataset.id);
  }

  render() {
    const { columns, data, loading } = this.props;
    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <table className={classes.container}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((element) => (
            <tr
              key={element._id}
              data-id={element._id}
              onClick={this.handleClick}
              style={{ cursor: "pointer" }}
            >
              {columns.map((column) => (
                <td key={column}>{element[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default ListSearchResult;
