import React, { Component } from "react";
import ListTitle from "../../../masterPage/components/ListTitle";
import Footer from "../../../masterPage/components/Footer";
import ListSearchResult from "../../../masterPage/components/ListSearchResult";
import CreateBillOfLadingModal from "../components/CreateBillOfLadingModal";
import FunctionTitle from "../components/FunctionTitle";
import { PODetailContext } from "../components/PODetailProvider";

export class PODetail extends Component {
  static contextType = PODetailContext;
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      title,
      handleSearch,
      selectedRecords,
      permissions,
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
      toggleCreateModalVisible,
      handleSelect,
    } = this.context;
    return (
      <div>
        <FunctionTitle onSearch={handleSearch} title={title} />
        <ListSearchResult
          columns={columns}
          data={searchResult}
          onSelect={handleSelect}
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
        {createModalVisible && <CreateBillOfLadingModal />}
      </div>
    );
  }
}

export default PODetail;
