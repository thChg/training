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
  managerOptionsSelector,
  companyOptionsSelector,
  companyCEOSelector,
  renderStaffListTitle,
  staffListRenderSelector,
  staffOptionsSelector,
  positionOptionsSelector,
} from "../selectors/DepartmentFormSelector";
import RefField from "../../../masterPage/components/RefField";
import ScrollContainer from "../../../masterPage/components/ScrollContainer";
import TableContainer from "../../../masterPage/components/TableContainer";
import AddObjectButton from "../../../masterPage/components/AddObjectButton";
import RemoveLineCell from "../../../masterPage/components/RemoveLineCell";

const ThisContext = React.createContext({});

export class DepartmentForm extends Component {
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
        RefField,
        AddObjectButton,
        RemoveLineCell,
      ],
      ThisContext
    );
    const { pageLoad, data } = this.state;
    const { managerId, companyId } = pageLoad;
    const positionId = pageLoad["staffList.positionId"];
    const staffId = pageLoad["staffList.staffId"];
    const {
      companyCEOUsername,
      companyCEOFullname,
      staffList,
      managerUsername,
      managerFullname,
    } = data;
  
    const managerOptions = managerOptionsSelector(
      managerId.data.objectList,
      "managerOptions"
    );
    const companyOptions = companyOptionsSelector(
      companyId.data.objectList,
      "companyOptions"
    );
    const companyCEO = companyCEOSelector(
      companyCEOUsername,
      companyCEOFullname,
      "companyCEO"
    );
    const staffOptions = staffOptionsSelector(
      staffId.data.objectList,
      "staffOptions"
    );
    const positionOptions = positionOptionsSelector(
      positionId.data.objectList,
      "positionOptions"
    );

    return (
      <ThisContext.Provider value={{ self: this }}>
        <TitleContainer>
          <TitleName />
          <FormActionButtons />
        </TitleContainer>
        <div style={{ padding: "15px" }}>
          <Row>
            <TextField label="Department Code" />
            <TextField label="Department Name" />
            <TextField label="Department Address" />
            <SelectField
              label="Manager"
              options={managerOptions}
              name="managerId"
            />
          </Row>
          <Row>
            <SelectField
              label="Company"
              options={companyOptions}
              name="companyId"
            />
            <RefField label="Company CEO" value={companyCEO} />
          </Row>
          <ScrollContainer name="Staff List">
            <TableContainer>
              {renderStaffListTitle()}
              {staffListRenderSelector(
                staffList.data,
                staffOptions,
                positionOptions,
                "staffListRenderSelector"
              )}
            </TableContainer>
          </ScrollContainer>
          <AddObjectButton name="staffList" />
        </div>
      </ThisContext.Provider>
    );
  }
}

export default DepartmentForm;
