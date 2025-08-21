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

const ThisContext = React.createContext({});

export class FunctionForm extends Component {
  constructor(props) {
    super(props);

    initFormComponent(this, props);
  }

  async componentDidMount() {
    await loadFormComponentData(this);
  }

  render() {
    bindComponentToContext(
      [TextField, TitleContainer, TitleName, FormActionButtons, SelectField],
      ThisContext
    );
    const { data, pageLoad } = this.state;
    const { moduleId, parentId } = pageLoad;

    if (!data) return;

    const moduleListOptions = moduleListSelector(
      moduleId.data.objectList,
      "moduleList"
    );
    const parentListOptions = parentListSelector(
      parentId.data.objectList,
      data.functionUrl,
      "parentList"
    );

    return (
      <ThisContext.Provider value={{ self: this }}>
        <TitleContainer>
          <TitleName />
          <FormActionButtons />
        </TitleContainer>
        <div style={{ padding: "15px" }}>
          <Row>
            <TextField label="Function Name" />
            <TextField label="Function Url" />
            <TextField label="Function Order" />
            <TextField
              label="Function Action List"
              placeholder="[c]:created,[r]:read,[u]:update,[d]:delete"
            />
          </Row>
          <Row>
            <SelectField
              label="Module"
              name="moduleId"
              options={moduleListOptions}
            />
            <SelectField
              label="Parent"
              name="parentId"
              options={parentListOptions}
            />
          </Row>
        </div>
      </ThisContext.Provider>
    );
  }
}

export default FunctionForm;
