import React, { Component } from "react";
import { initFormComponent, loadFormComponentData } from "../../../masterPage/utils/FormComponentHelper";
import { bindComponentToContext } from "../../../masterPage/utils/BindHelper";
import TextField from "../../../masterPage/components/TextField";
import TitleContainer from "../../../masterPage/components/TitleContainer";
import TitleName from "../../../masterPage/components/TitleName";
import FormActionButtons from "../../../masterPage/components/FormActionButtons";
import Row from "../../../masterPage/components/Row";
import FillerField from "../../../masterPage/components/FillerField";

const ThisContext = React.createContext({});

export class ModuleForm extends Component {
  constructor(props) {
    super(props);

    initFormComponent(this, props);
  }

  async componentDidMount() {
    await loadFormComponentData(this);
  }

  render() {
    bindComponentToContext([TextField, TitleName, FormActionButtons], ThisContext);
    return (
      <ThisContext.Provider value={{ self: this }}>
        <TitleContainer>
          <TitleName />
          <FormActionButtons />
        </TitleContainer>
        <div style={{ padding: "15px" }}>
          <Row>
            <TextField label="Module Code" />
            <TextField label="Module Name" />
          </Row>
          <Row>
            <TextField label="Module Order" />
            <FillerField />
          </Row>
        </div>
      </ThisContext.Provider>
    );
  }
}

export default ModuleForm;
