import React, { Component } from "react";
import ListTitle from "../../../masterPage/components/ListTitle";
import Footer from "../../../masterPage/components/Footer";
import ListSearchResult from "../../../masterPage/components/ListSearchResult";

import { EmployeeContext } from "../components/EmployeeProvider";
import CreateEmployeeModal from "../components/CreateEmployeeModal";

export class Employee extends Component {
  static contextType = EmployeeContext;
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      title,
      selectedRecords,
      handleSearch,
      permissions,
      exportToExcel,
      setRecordPerPage,
      setCurrentPage,
      currentPage,
      recordPerPage,
      recordLength,
      handleDeleteRecords,
      removeFromSelectedRecords,
      printSelectedRecords,
      columns,
      searchResult,
      loading,
      setSelectedRecords,
      setSelectedCustomerId,
      createModalVisible,
      toggleCreateModalVisible,
    } = this.context;
    return (
      <div>
        <ListTitle
          title={title}
          onCreate={toggleCreateModalVisible}
          onSearch={handleSearch}
          permissions={permissions}
          exportToExcel={exportToExcel}
          selectedRecords={selectedRecords}
        />
        <ListSearchResult
          columns={columns}
          data={searchResult}
          onSelect={setSelectedCustomerId}
          loading={loading}
          recordPerPage={recordPerPage}
          currentPage={currentPage}
          onSelectRecord={setSelectedRecords}
          selectedRecords={selectedRecords}
        />
        <Footer
          onSelectRecordPerPage={setRecordPerPage}
          onSelectPage={setCurrentPage}
          currentPage={currentPage}
          recordPerPage={recordPerPage}
          recordLength={recordLength}
          selectedRecords={selectedRecords}
          permissions={permissions}
          onDeleteRecords={handleDeleteRecords}
          onDeselectAll={removeFromSelectedRecords}
          onPrint={printSelectedRecords}
        />
        {createModalVisible && <CreateEmployeeModal />}
      </div>
    );
  }
}

export default Employee;
