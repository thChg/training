import React, { Component } from "react";

import CreateUserModal from "../components/CreateUserModal";
import UserInfoModal from "../components/UserInfoModal";
import { UserManagementContext } from "../components/UserManagementProvider";
import ListTitle from "../../../masterPage/components/ListTitle";
import ListSearchResult from "../../../masterPage/components/ListSearchResult";
import Footer from "../../../masterPage/components/Footer";

export class UserManagement extends Component {
  static contextType = UserManagementContext;
  constructor(props) {
    super(props);
  }

  render() {
    const {
      onCreate,
      title,
      selectedUserId,
      setSelectedUserId,
      searchResult,
      onSearch,
      columns,
      loading,
      permissions,
      setRecordPerPage,
      setCurrentPage,
      currentPage,
      recordPerPage,
      recordLength,
      setSelectedRecords,
      selectedRecords,
      handleDeleteRecords,
      removeFromSelectedRecords,
      printSelectedRecords,
      exportToExcel
    } = this.context;
    return (
      <div>
        <ListTitle
          title={title}
          onCreate={onCreate}
          onSearch={onSearch}
          permissions={permissions}
          exportToExcel={exportToExcel}
          selectedRecords={selectedRecords}
        />

        <ListSearchResult
          columns={columns}
          data={searchResult}
          onSelect={setSelectedUserId}
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
        <CreateUserModal />
        {selectedUserId && <UserInfoModal />}
      </div>
    );
  }
}

export default UserManagement;
