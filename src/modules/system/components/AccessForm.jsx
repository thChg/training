import React, { Component } from "react";
import {
  initFormComponent,
  loadFormComponentData,
} from "../../../masterPage/utils/FormComponentHelper";
import Row from "../../../masterPage/components/Row";
import { bindComponentToContext } from "../../../masterPage/utils/BindHelper";
import TextField from "../../../masterPage/components/TextField";
import TitleContainer from "../../../masterPage/components/TitleContainer";
import TitleName from "../../../masterPage/components/TitleName";
import FormActionButtons from "../../../masterPage/components/FormActionButtons";
import {
  moduleListSelector,
  parentListSelector,
} from "../selectors/FunctionFormSelectors";
import SelectField from "../../../masterPage/components/SelectField";
import FillerField from "../../../masterPage/components/FillerField";
import RefField from "../../../masterPage/components/RefField";
import ScrollContainer from "../../../masterPage/components/ScrollContainer";
import TableContainer from "../../../masterPage/components/TableContainer";
import {
  recordFeatureRenderSelector,
  renderRecordFeatureTitle,
} from "../selectors/AccessFormSelector";

const ThisContext = React.createContext({});

export class AccessForm extends Component {
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
      ],
      ThisContext
    );
    const { data } = this.state;
    const { functionName, functionUrl, functionFeatureList, userFeatureList } =
      data;
    const accessFunction =
      functionName && functionUrl && `${functionName} - ${functionUrl}`;
    return (
      <ThisContext.Provider value={{ self: this }}>
        <TitleContainer>
          <TitleName />
          <FormActionButtons />
        </TitleContainer>
        <div style={{ padding: "15px" }}>
          <Row>
            <TextField label="Policy Name" />
          </Row>
          <Row>
            <TextField label="Username" />
            <TextField label="Fullname" />
            <RefField label="Function" value={accessFunction} />
            <FillerField />
          </Row>
          <Row>
            <TextField label="Service Name" />
            <TextField label="Action Code" />
            <TextField label="Method" />
            <TextField label="Path" />
          </Row>
          <ScrollContainer name="Record Feature" height="300px">
            <TableContainer>
              {renderRecordFeatureTitle()}
              {recordFeatureRenderSelector(
                functionFeatureList,
                "recordFeature"
              )}
            </TableContainer>
          </ScrollContainer>
          <ScrollContainer name="User Feature" height="300px">
            <TableContainer>
              {renderRecordFeatureTitle()}
              {recordFeatureRenderSelector(userFeatureList, "userFeature")}
            </TableContainer>
          </ScrollContainer>
        </div>
      </ThisContext.Provider>
    );
  }
}

export default AccessForm;
