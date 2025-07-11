import React, { Component } from "react";
import classes from "../../../css/modules/components/CreateModal.module.css";
import { ProductContext } from "./ProductProvider";
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "../containers/ProductMap";

export class CreateProductModal extends Component {
  static contextType = ProductContext;
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      unit: "",
    };

    this.onCreate = this.onCreate.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onCreate() {
    const { name, unit } = this.state;
    const { currentPage, recordPerPage, toggleCreateModalVisible } =
      this.context;

    if (name === "" || unit === "") {
      alert("Fill in all neccessary fields!");
      return;
    }

    this.props.createProduct({ name, unit }, currentPage, recordPerPage);

    toggleCreateModalVisible();
  }

  handleInputChange(event) {
    const { value, name } = event.target;
    this.setState({ [name]: value });
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
    this.props.importProductFromFile(file, currentPage, recordPerPage);
    toggleCreateModalVisible();
  }

  render() {
    const { toggleCreateModalVisible } = this.context;
    return (
      <div className={classes.modalBackdrop}>
        <div className={classes.modal}>
          <div className={classes.title}>Add a new Product</div>
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
              Name:
              <input
                type="text"
                onChange={this.handleInputChange}
                name="name"
              />
            </label>
            <div style={{ display: "flex", gap: "15px" }}>
              <label style={{ flex: 1 }}>
                Unit:
                <input
                  type="text"
                  onChange={this.handleInputChange}
                  name="unit"
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateProductModal);
