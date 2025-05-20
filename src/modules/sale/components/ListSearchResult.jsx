import React, { Component } from "react";
import classes from "../../../css/modules/components/ListSearchResult.module.css";
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "../containers/SaleMap";
import SaleContext from "./SaleContext";

export class ListSearchResult extends Component {
  static contextType = SaleContext;
  constructor(props) {
    super(props);

    this.state = {};
  }

  async componentDidMount() {
    await this.props.fetchViewPermission();
    if (this.props.canView) {
      await this.props.fetchOrder();
    }
    this.context.setSearchResult(this.props.orders);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.orders !== this.props.orders) {
      this.context.setSearchResult(this.props.orders);
    }
  }

  render() {
    if (this.props.loading) {
      return <div>Loading...</div>;
    }

    if (!this.props.canView) {
      return null;
    }

    return (
      <table className={classes.container}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Employee</th>
            <th>Apartment</th>
            <th>CreatedAt</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {this.context.searchResult.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.name}</td>
              <td>{order.employee}</td>
              <td>{order.apartment}</td>
              <td>{order.createdAt}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListSearchResult);
