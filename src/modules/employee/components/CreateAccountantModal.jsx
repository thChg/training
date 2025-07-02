import React, { Component } from "react";
import classes from "../../../css/modules/components/CreateModal.module.css";
import { connect } from "react-redux";
import {
  mapDispatchToProp,
  mapStateToProps,
} from "../containers/AccountantMap";
import { AccountantContext } from "./AccountantProvider";

export class CreateAccountantModal extends Component {
  static contextType = AccountantContext;
  constructor(props) {
    super(props);

    this.state = {
      fullname: "",
      password: "",
      email: "",
      phone: "",
    };

    this.onCreate = this.onCreate.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onCreate() {
    const { fullname, password, email, address, taxId, phone } = this.state;
    const { currentPage, recordPerPage, toggleCreateModalVisible } =
      this.context;

    if (
      (fullname === "" || password === "",
      address === "",
      taxId === "",
      email === "" || phone === "")
    ) {
      alert("Fill in all neccessary fields!");
      return;
    }
    this.props.createRecord(
      { fullname, password, email, address, taxId, phone },
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
    this.props.importRecordFromFile(file, currentPage, recordPerPage);
    toggleCreateModalVisible();
  }

  render() {
    const { toggleCreateModalVisible } = this.context;
    return (
      <div className={classes.modalBackdrop}>
        <div className={classes.modal}>
          <div className={classes.title}>Add a new Accountant</div>
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
              Full Name:
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
            <div style={{ display: "flex", gap: "15px" }}>
              <label style={{ flex: 1.4 }}>
                Email:
                <input
                  type="email"
                  onChange={this.handleInputChange}
                  name="email"
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

export default connect(
  mapStateToProps,
  mapDispatchToProp
)(CreateAccountantModal);
