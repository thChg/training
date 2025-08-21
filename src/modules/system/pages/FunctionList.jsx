import React, { Component } from "react";

export class FunctionList extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      title,
      onCreate,
      onSearch,
      columns,
      searchResult,
      onSelect,
      permissions,
      menu,
      recordLength,
      currentPage,
      recordPerPage,
      setCurrentPage,
      setRecordPerPage,
      selectedRecords,
      setSelectedRecords,
      handleDeleteRecords,
      removeFromSelectedRecords,
    } = this.context;
    return (
      <div>
        <ListTitle
          title={title}
          onCreate={onCreate}
          onSearch={onSearch}
          permissions={permissions}
          menu={menu}
          selectedRecords={selectedRecords}
        />
        <ListSearchResult
          columns={columns}
          data={searchResult}
          onSelect={onSelect}
          recordPerPage={recordPerPage}
          currentPage={currentPage}
          selectedRecords={selectedRecords}
          onSelectRecord={setSelectedRecords}
        />
        <Footer
          recordLength={recordLength}
          recordPerPage={recordPerPage}
          currentPage={currentPage}
          onSelectPage={setCurrentPage}
          onSelectRecordPerPage={setRecordPerPage}
          permissions={permissions}
          selectedRecords={selectedRecords}
          onDeleteRecords={handleDeleteRecords}
          onDeselectAll={removeFromSelectedRecords}
        />
        <CreateRoleModal />
      </div>
    );
  }
}

export default FunctionList;
