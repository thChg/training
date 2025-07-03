import React, { Component } from "react";
import Footer from "../../../masterPage/components/Footer";
import ListSearchResult from "../../../masterPage/components/ListSearchResult";
import { POApproveDetailContext } from "../components/POApproveDetailProvider";
import OrderApproveTitle from "../../../masterPage/components/OrderApproveTitle";

export class POApproveDetail extends Component {
  static contextType = POApproveDetailContext;
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
      purchaseOrder,
      handleApprovePO,
    } = this.context;

    return (
      <div>
        <OrderApproveTitle
          title={title}
          onSearch={handleSearch}
          pagePermissions={permissions}
          order={purchaseOrder}
          onApprove={handleApprovePO}
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

export default POApproveDetail;
