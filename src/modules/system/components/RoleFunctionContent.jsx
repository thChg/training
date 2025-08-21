import React, { Component } from "react";
import classes from "../../../css/modules/components/RoleFunctionContent.module.css";
import { connect } from "react-redux";
import { FaTimes } from "react-icons/fa";
import Footer from "../../../masterPage/components/Footer";

export class RoleFunctionContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      functionList: [],
    };

    this.handleAccessChange = this.handleAccessChange.bind(this, this);
    this.handlePermissionsChange = this.handlePermissionsChange.bind(
      this,
      this
    );
    this.handleSelectRecord = this.handleSelectRecord.bind(this);
  }

  componentDidMount() {
    const { functionList, fetchFunctionList } = this.props;

    if (functionList.length <= 0) {
      fetchFunctionList();
    }

    this.setState({ functionList: this.props.functionList });
  }

  handleAccessChange(self, event) {
    this.props.onAccessChange(event);
  }

  handlePermissionsChange(self, event) {
    this.props.onPermissionsChange(event);
  }

  handleSelectRecord(event) {
    this.props.onSelectRecord(event.target.value);
  }

  render() {
    const {
      accessList,
      isEditing,
      roleAccess,
      rolePermissions,
      userData,
      selectedRecords,
      setSelectedRecords,
      recordPerPage,
      recordLength,
    } = this.props;

    return (
      <div className={classes.container}>
        <div className={classes.row}>
          <div className={classes.field}>
            <div className={classes.title}>Role Name:</div>
            <div className={classes.head}>
              <input type="text" className={classes.headInput} name="name" />
            </div>
          </div>
          <div className={classes.field}>
            <div className={classes.title}>Role Code:</div>
            <div className={classes.head}>
              <input type="text" className={classes.headInput} name="name" />
            </div>
          </div>
        </div>
        <div className={classes.title} style={{ marginBottom: "8px" }}>
          Role's Function List
        </div>
        <div className={classes.tableContainer}>
          <table className={classes.table}>
            <thead>
              <th width={50}>Num.</th>
              <th width={50}>
                <input type="checkbox" />
              </th>
              <th>Function name</th>
              <th>Parent function</th>
              <th>Module name</th>
              <th width={55}></th>
            </thead>
            <tbody>
              {userData.functions.map((f, index) => (
                <tr key={f._id}>
                  <td style={{ textAlign: "center" }}>{index + 1}</td>
                  <td style={{ textAlign: "center" }}>
                    <input
                      type="checkbox"
                      value={f._id}
                      onChange={this.handleSelectRecord}
                    />
                  </td>
                  <td>{f.functionName}</td>
                  <td>{f.parentName ? f.parentName : "-"}</td>
                  <td>{f.moduleName}</td>
                  <td style={{ display: "flex", justifyContent: "center" }}>
                    <button className={classes.btn}>
                      <FaTimes />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Footer
          recordLength={recordLength}
          recordPerPage={recordPerPage}
          selectedRecords={selectedRecords}
        />
      </div>
    );
  }
}

export default (RoleFunctionContent);
