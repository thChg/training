import React, { Component } from "react";
import classes from "../../../css/modules/components/CreateCustomerModal.module.css";
import { CustomerContext } from "./CustomerProvider";
import { connect } from "react-redux";
import { mapDispatchToProp, mapStateToProps } from "../containers/CustomerMap";

export class CreateCustomerModal extends Component {
  static contextType = CustomerContext;
  constructor(props) {
    super(props);

    this.state = {
      fullname: "",
      password: "",
      email: "",
      company: "",
      phone: "",
    };

    this.onCreate = this.onCreate.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onCreate() {
    const { fullname, password, email, company, phone } = this.state;
    const { currentPage, recordPerPage, toggleCreateModalVisible } =
      this.context;

    if ((fullname === "" || password === "", email === "" || phone === "")) {
      alert("Fill in all neccessary fields!");
      return;
    }
    this.props.createCustomer(
      { fullname, password, email, company, phone },
      currentPage,
      recordPerPage
    );

    toggleCreateModalVisible();
  }

  handleInputChange(event) {
    const { value, name } = event.target;
    this.setState(() => {
      switch (name) {
        case "fullname":
          return { fullname: value };
        case "password":
          return { password: value };
        case "company":
          return { company: value };
        case "email":
          return { email: value };
        case "phone":
          return { phone: value };
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { currentPage, recordPerPage, toggleCreateModalVisible } =
      this.context;
    const file = event.target.querySelector('input[type="file"]').files[0];
    if (!file) {
        alert("Specify a .xlsx file");
        return;
    }
    this.props.importCustomerFromFile(file, currentPage, recordPerPage);
    toggleCreateModalVisible();
  }

  render() {
    const { toggleCreateModalVisible } = this.context;
    return (
      <div className={classes.modalBackdrop}>
        <div className={classes.modal}>
          <div className={classes.title}>Add a new Customer</div>
          <div className={classes.body}>
            <div>
              <label>Import from xlsx file:</label>
              <form className={classes.fileUpload} onSubmit={this.handleSubmit}>
                <input type="file" accept=".xlsx,.xls" />
                <button className={classes.submitBtn} type="submit">
                  Submit
                </button>
              </form>
            </div>
            <label>
              Full name:
              <input
                type="text"
                onChange={this.handleInputChange}
                name="fullname"
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                onChange={this.handleInputChange}
                name="password"
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                onChange={this.handleInputChange}
                name="email"
              />
            </label>
            <div style={{ display: "flex", gap: "15px" }}>
              <label style={{ flex: 1 }}>
                Company (optional):
                <input
                  type="text"
                  onChange={this.handleInputChange}
                  name="company"
                />
              </label>
              <label style={{ flex: 1 }}>
                Phone:
                <input
                  type="text"
                  onChange={this.handleInputChange}
                  name="phone"
                />
              </label>
            </div>
            <div className={classes.modalButtons}>
              <button
                className={classes.cancelBtn}
                onClick={toggleCreateModalVisible}
              >
                Cancel
              </button>
              <button className={classes.createBtn} onClick={this.onCreate}>
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProp)(CreateCustomerModal);
