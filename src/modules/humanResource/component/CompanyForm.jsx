import React, { Component } from "react";
import {
  initFormComponent,
  loadFormComponentData,
} from "../../../masterPage/utils/FormComponentHelper";
import TextField from "../../../masterPage/components/TextField";
import TitleContainer from "../../../masterPage/components/TitleContainer";
import TitleName from "../../../masterPage/components/TitleName";
import FormActionButtons from "../../../masterPage/components/FormActionButtons";
import SelectField from "../../../masterPage/components/SelectField";
import { bindComponentToContext } from "../../../masterPage/utils/BindHelper";
import Row from "../../../masterPage/components/Row";
import FillerField from "../../../masterPage/components/FillerField";
import {
  ceoOptionsSelector,
  departmentListRenderSelector,
  departmentOptionsSelector,
  positionOptionsSelector,
  staffOptionsSelector,
  renderDepartmentListTitle,
  renderStaffListTitle,
  staffListRenderSelector,
} from "../selectors/CompanyFormSelector";
import ScrollContainer from "../../../masterPage/components/ScrollContainer";
import TableContainer from "../../../masterPage/components/TableContainer";
import AddObjectButton from "../../../masterPage/components/AddObjectButton";
import RemoveLineCell from "../../../masterPage/components/RemoveLineCell";

const ThisContext = React.createContext({});

export class CompanyForm extends Component {
  constructor(props) {
    super(props);

    initFormComponent(this, props);
  }

  async componentDidMount() {
    await loadFormComponentData(this);
  }

  render() {
    bindComponentToContext(
      [
        TextField,
        TitleContainer,
        TitleName,
        FormActionButtons,
        SelectField,
        AddObjectButton,
        RemoveLineCell,
      ],
      ThisContext
    );

    const { pageLoad, data } = this.state;

    const { departmentList, staffList } = data;
    const { companyCEOId } = pageLoad;
    const departmentId = pageLoad["staffList.departmentId"];
    const positionId = pageLoad["staffList.positionId"];
    const staffId = pageLoad["staffList.staffId"];

    const ceoOptions = ceoOptionsSelector(
      companyCEOId.data.objectList,
      "ceoOptions"
    );
    const departmentOptions = departmentOptionsSelector(
      departmentId.data.objectList,
      "departmentOptions"
    );
    const positionOptions = positionOptionsSelector(
      positionId.data.objectList,
      "positionOptions"
    );
    const staffOptions = staffOptionsSelector(
      staffId.data.objectList,
      "staffOptions"
    );

    return (
      <ThisContext.Provider value={{ self: this }}>
        <TitleContainer>
          <TitleName />
          <FormActionButtons />
        </TitleContainer>
        <div style={{ padding: "15px" }}>
          <Row>
            <TextField label="Company Code" />
            <TextField label="Company Name" />
            <TextField label="Company Tax Code" />
            <TextField label="Company Phone" />
          </Row>
          <Row>
            <TextField label="Company Address" />
            <TextField label="Company Email" />
            <SelectField label="CEO" options={ceoOptions} name="companyCEOId" />
            <FillerField />
          </Row>
          <ScrollContainer name="Department List" height={300}>
            <TableContainer>
              {renderDepartmentListTitle()}
              {departmentListRenderSelector(
                departmentList.data,
                "departmentList"
              )}
            </TableContainer>
          </ScrollContainer>
          <ScrollContainer name="Staff List" height={300}>
            <TableContainer>
              {renderStaffListTitle()}
              {staffListRenderSelector(
                staffList.data,
                departmentOptions,
                positionOptions,
                staffOptions,
                "staffList"
              )}
            </TableContainer>
          </ScrollContainer>
        </div>
      </ThisContext.Provider>
    );
  }
}

export default CompanyForm;
