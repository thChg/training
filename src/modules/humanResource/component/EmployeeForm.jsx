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
import DateField from "../../../masterPage/components/DateField";
import {
  companyOptionsSelector,
  departmentOptionsSelector,
  positionOptionsSelector,
  titleOptionsSelector,
  userOptionsSelector,
  companyCEOSelector,
  departmentManagerSelector,
  totalSalarySelector,
} from "../selectors/EmployeeFormSelector";
import FormSeparator from "../../../masterPage/components/FormSeparator";
import RefField from "../../../masterPage/components/RefField";

const ThisContext = React.createContext({});

export class EmployeeForm extends Component {
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
        DateField,
        RefField,
      ],
      ThisContext
    );

    const { pageLoad, data } = this.state;
    const {
      companyId: selectedCompany,
      companyCEOUsername,
      companyCEOFullname,
      managerUsername,
      managerFullname,
      email,
      grossSalary,
      travelAllowance,
      mealAllowance,
      kpiSalary,
    } = data;
    const { companyId, departmentId, positionId, titleId, userId } = pageLoad;

    const companyOptions = companyOptionsSelector(
      companyId.data.objectList,
      "companyOptions"
    );
    const departmentOptions = departmentOptionsSelector(
      departmentId.data.objectList,
      selectedCompany,
      "departmentOptions"
    );
    const positionOptions = positionOptionsSelector(
      positionId.data.objectList,
      "positionOptions"
    );
    const titleOptions = titleOptionsSelector(
      titleId.data.objectList,
      "titleOptions"
    );
    const userOptions = userOptionsSelector(
      userId.data.objectList,
      "userOptions"
    );
    const companyCEO = companyCEOSelector(
      companyCEOUsername,
      companyCEOFullname,
      "companyCEO"
    );
    const departmentManager = departmentManagerSelector(
      managerUsername,
      managerFullname,
      "departmentManager"
    );
    const totalSalary = totalSalarySelector(
      grossSalary,
      travelAllowance,
      mealAllowance,
      kpiSalary,
      "totalSalary"
    );

    return (
      <ThisContext.Provider value={{ self: this }}>
        <TitleContainer>
          <TitleName />
          <FormActionButtons />
        </TitleContainer>
        <div style={{ padding: "15px" }}>
          <Row>
            <TextField label="Employee Code" />
            <TextField label="Employee Name" />
            <DateField label="Employee Date Of Birth" />
            <TextField label="Employee Phone" />
          </Row>
          <Row>
            <SelectField
              name="companyId"
              label="Comany"
              options={companyOptions}
            />
            <RefField label="Company CEO" value={companyCEO} />
            <SelectField
              name="departmentId"
              label="Department"
              options={departmentOptions}
            />
            <RefField label="Department Manager" value={departmentManager} />
          </Row>
          <Row>
            <SelectField name="userId" label="User" options={userOptions} />
            <RefField label="Email" value={email} />
            <SelectField
              name="positionId"
              label="Position"
              options={positionOptions}
            />
            <SelectField name="titleId" label="Title" options={titleOptions} />
          </Row>
          <FormSeparator />
          <Row>
            <TextField label="Gross Salary" />
            <TextField label="Travel Allowance" />
            <TextField label="Meal Allowance" />
            <TextField label="Kpi Salary" />
          </Row>
          <Row>
            <RefField label="Total Salary" value={totalSalary} />
            <FillerField />
            <FillerField />
            <FillerField />
          </Row>
        </div>
      </ThisContext.Provider>
    );
  }
}

export default EmployeeForm;
