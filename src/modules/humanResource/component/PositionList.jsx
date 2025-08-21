import React, { Component } from "react";
import { bindComponentToContext } from "../../../masterPage/utils/BindHelper";
import TitleContainer from "../../../masterPage/components/TitleContainer";
import TitleName from "../../../masterPage/components/TitleName";
import ListActionButtons from "../../../masterPage/components/ListActionButtons";
import SearchBar from "../../../masterPage/components/SearchBar";
import TableContainer from "../../../masterPage/components/TableContainer";
import TableTitle from "../../../masterPage/components/TableTitle";
import ScrollContainer from "../../../masterPage/components/ScrollContainer";
import TableBody from "../../../masterPage/components/TableBody";
import FooterContainer from "../../../masterPage/components/FooterContainer";
import Pagination from "../../../masterPage/components/Pagination";
import RecordSummary from "../../../masterPage/components/RecordSummary";
import RecordActions from "../../../masterPage/components/RecordActions";
import {
  initListComponent,
  loadListComponentData,
} from "../../../masterPage/utils/ListComponentHelper";

const ThisContext = React.createContext({});

export class PositionList extends Component {
  constructor(props) {
    super(props);

    initListComponent(this, props);
  }

  async componentDidMount() {
    await loadListComponentData(this);
  }

  render() {
    bindComponentToContext(
      [
        TitleContainer,
        TitleName,
        SearchBar,
        ListActionButtons,
        TableTitle,
        TableContainer,
        TableBody,
        Pagination,
        RecordSummary,
        RecordActions,
      ],
      ThisContext
    );

    const { recordPerPage, currentPage, length } = this.state.data;
    const { onSetRecordPerPage, onPageSelect } = this;

    return (
      <ThisContext.Provider value={{ self: this }}>
        <TitleContainer>
          <TitleName />
          <div style={{ display: "flex", gap: "10px" }}>
            <SearchBar />
            <ListActionButtons />
          </div>
        </TitleContainer>
        <div style={{ padding: "10px" }}>
          <ScrollContainer height="calc(100vh - 170px)">
            <TableContainer>
              <TableTitle />
              <TableBody />
            </TableContainer>
          </ScrollContainer>
        </div>
        <FooterContainer>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <RecordSummary />
            <RecordActions />
          </div>
          <Pagination />
        </FooterContainer>
      </ThisContext.Provider>
    );
  }
}

export default PositionList;
