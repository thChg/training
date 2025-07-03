import React, { Component } from "react";
import Footer from "../../../masterPage/components/Footer";
import ListSearchResult from "../../../masterPage/components/ListSearchResult";
import { SOApproveDetailContext } from "../components/SOApproveDetailProvider";
import OrderApproveTitle from "../../../masterPage/components/OrderApproveTitle";

export class SOApproveDetail extends Component {
  static contextType = SOApproveDetailContext;
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
      handleSelect,
      saleOrder,
      handleApproveSO,
    } = this.context;

    return (
      <div>
        <OrderApproveTitle
          title={title}
          onSearch={handleSearch}
          pagePermissions={permissions}
          order={saleOrder}
          onApprove={handleApproveSO}
        />
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
      </div>
    );
  }
}

export default SOApproveDetail;
