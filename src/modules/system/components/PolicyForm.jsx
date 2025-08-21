import React, { Component } from "react";
import {
  initFormComponent,
  loadFormComponentData,
} from "../../../masterPage/utils/FormComponentHelper";
import { bindComponentToContext } from "../../../masterPage/utils/BindHelper";
import TextField from "../../../masterPage/components/TextField";
import TitleContainer from "../../../masterPage/components/TitleContainer";
import TitleName from "../../../masterPage/components/TitleName";
import FormActionButtons from "../../../masterPage/components/FormActionButtons";
import Row from "../../../masterPage/components/Row";
import FillerField from "../../../masterPage/components/FillerField";
import SelectField from "../../../masterPage/components/SelectField";
import RefField from "../../../masterPage/components/RefField";
import {
  functionOptionsSelector,
  serviceOptionsSelector,
  actionCodeOptionsSelector,
  renderRecordFeatureTitle,
  recordFeatureRenderSelector,
  fieldListSelector,
  renderUserFeatureTitle,
  userFeatureRenderSelector,
} from "../selectors/PolicyFormSelector";
import {
  handleIsUserFeatureToggle,
  onSelectActionCode,
  onSelectFeature,
  onSelectUserField
} from "../functions/PolicyFormFunction";
import ScrollContainer from "../../../masterPage/components/ScrollContainer";
import TableContainer from "../../../masterPage/components/TableContainer";
import AddObjectButton from "../../../masterPage/components/AddObjectButton";
import RemoveLineCell from "../../../masterPage/components/RemoveLineCell";

const ThisContext = React.createContext({});

export class PolicyForm extends Component {
  constructor(props) {
    super(props);

    initFormComponent(this, props);

    this.onSelectActionCode = onSelectActionCode.bind(this, this);
    this.onSelectFeature = onSelectFeature.bind(this, this);
    this.handleIsUserFeatureToggle = handleIsUserFeatureToggle.bind(this, this);
    this.onSelectUserField = onSelectUserField.bind(this, this);
  }

  async componentDidMount() {
    await loadFormComponentData(this);
  }

  render() {
    bindComponentToContext(
      [
        TextField,
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
    const {
      method,
      path,
      serviceId: selectedServiceId,
      recordFeatureList,
      userFeatureList,
    } = data;
    const { serviceId, functionId } = pageLoad;

    const serviceOptions = serviceOptionsSelector(
      serviceId.data.objectList,
      "serviceOptions"
    );
    const functionOptions = functionOptionsSelector(
      functionId.data.objectList,
      "functionOptions"
    );
    const actionCodeOptions = actionCodeOptionsSelector(
      selectedServiceId,
      serviceId.data.objectList,
      "actionList"
    );
    const fieldList = fieldListSelector(
      selectedServiceId,
      serviceId.data.objectList,
      "fieldList"
    );

    return (
      <ThisContext.Provider value={{ self: this }}>
        <TitleContainer>
          <TitleName />
          <FormActionButtons />
        </TitleContainer>
        <div style={{ padding: "15px" }}>
          <Row>
            <TextField label="Policy Name" />
            <SelectField
              label="Service"
              name="serviceId"
              options={serviceOptions}
            />
            <SelectField
              label="Function"
              name="functionId"
              options={functionOptions}
            />
            <FillerField />
          </Row>
          <Row>
            <SelectField
              label="Action Code"
              name="actionCode"
              options={actionCodeOptions}
              onSelect={this.onSelectActionCode}
            />
            <RefField label="Method" value={method} />
            <RefField label="Path" value={path} />
            <FillerField />
          </Row>
          <ScrollContainer name="Record Feature" height="300px">
            <TableContainer>
              {renderRecordFeatureTitle()}
              {recordFeatureRenderSelector(
                this,
                recordFeatureList.data,
                fieldList,
                "recordFeatureList"
              )}
            </TableContainer>
          </ScrollContainer>
          <AddObjectButton name="recordFeatureList" />
          <ScrollContainer name="User Feature" height="300px">
            <TableContainer>
              {renderUserFeatureTitle()}
              {userFeatureRenderSelector(
                this,
                userFeatureList.data,
                "recordFeatureList"
              )}
            </TableContainer>
          </ScrollContainer>
          <AddObjectButton name="userFeatureList" />
        </div>
      </ThisContext.Provider>
    );
  }
}

export default PolicyForm;
