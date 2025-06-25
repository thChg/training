import React, { Component } from "react";
import ListTitle from "../../../masterPage/components/ListTitle";
import { RoleManagementContext } from "../components/RoleManagementProvider";
import CreateRoleModal from "../components/CreateRoleModal";
import ListSearchResult from "../../../masterPage/components/ListSearchResult";
import Footer from "../../../masterPage/components/Footer";

export class RoleManagement extends Component {
  static contextType = RoleManagementContext;
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
      removeFromSelectedRecords
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

export default RoleManagement;
