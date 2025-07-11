import React, { Component } from "react";
import ListTitle from "../../../masterPage/components/ListTitle";
import Footer from "../../../masterPage/components/Footer";
import ListSearchResult from "../../../masterPage/components/ListSearchResult";
import { FiscalPeriodContext } from "../components/FiscalPeriodProvider";
import CreateFiscalPeriodModal from "../components/CreateFiscalPeriodModal";
import FiscalPeriodDetailModal from "../components/FiscalPeriodDetailModal";

export class FiscalPeriod extends Component {
  static contextType = FiscalPeriodContext;
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
      createModalVisible,
      setSelectedFiscalPeriodId,
      toggleCreateModalVisible,
      selectedFiscalPeriodId,
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
          onSelect={setSelectedFiscalPeriodId}
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
        {createModalVisible && <CreateFiscalPeriodModal />}
        {selectedFiscalPeriodId && <FiscalPeriodDetailModal />}
      </div>
    );
  }
}

export default FiscalPeriod;
