import React, { Component } from "react";
import ListTitle from "../../../masterPage/components/ListTitle";
import Footer from "../../../masterPage/components/Footer";
import ListSearchResult from "../../../masterPage/components/ListSearchResult";

import { AccountantContext } from "../components/AccountantProvider";
import CreateAccountantModal from "../components/CreateAccountantModal";

export class Accountant extends Component {
  static contextType = AccountantContext;
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
          {createModalVisible && <CreateAccountantModal />}
      </div>
    );
  }
}

export default Accountant;
