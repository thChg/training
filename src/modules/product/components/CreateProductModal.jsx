import React, { Component } from "react";
import classes from "../../../css/modules/components/CreateModal.module.css";
import { ProductManagementContext } from "./ProductManagementProvider";
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "../containers/ProductManagementMap";

export class CreateProductModal extends Component {
  static contextType = ProductManagementContext;
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      category: "",
      description: "",
      price: "",
    };

    this.onCreate = this.onCreate.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onCreate() {
    const { name, category, description, price } = this.state;
    const { currentPage, recordPerPage, toggleCreateModalVisible } =
      this.context;

    if (name === "" || category === "" || price === "") {
      alert("Fill in all neccessary fields!");
      return;
    }
    if (isNaN(Number(price))) {
      alert("Price must be a valid number");
    }
    this.props.createProduct(
      { name, category, description, price },
      currentPage,
      recordPerPage
    );

    toggleCreateModalVisible();
  }

  handleInputChange(event) {
    const { value, name } = event.target;
    this.setState(() => {
      switch (name) {
        case "name":
          return { name: value };
        case "category":
          return { category: value };
        case "description":
          return { description: value };
        case "price":
          return { price: value };
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
                Category:
                <input
                  type="text"
                  onChange={this.handleInputChange}
                  name="category"
                />
              </label>
              <label style={{ flex: 1 }}>
                Price:
                <input
                  type="text"
                  onChange={this.handleInputChange}
                  name="price"
                />
              </label>
            </div>
            <label>
              Description:
              <input
                type="text"
                onChange={this.handleInputChange}
                name="description"
              />
            </label>
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
