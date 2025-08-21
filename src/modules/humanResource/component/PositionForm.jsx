import React, { Component } from "react";
import {
  initFormComponent,
  loadFormComponentData,
} from "../../../masterPage/utils/FormComponentHelper";
import { bindComponentToContext } from "../../../masterPage/utils/BindHelper";
import TitleContainer from "../../../masterPage/components/TitleContainer";
import TitleName from "../../../masterPage/components/TitleName";
import Row from "../../../masterPage/components/Row";
import TextField from "../../../masterPage/components/TextField";
import FormActionButtons from "../../../masterPage/components/FormActionButtons";
import SelectField from "../../../masterPage/components/SelectField";
import { titleOptionsSelector } from "../selectors/PositionFormSelector";

const ThisContext = React.createContext({});

export class PositionForm extends Component {
  constructor(props) {
    super(props);

    initFormComponent(this, props);
  }

  async componentDidMount() {
    loadFormComponentData(this);
  }

  render() {
    bindComponentToContext(
      [
        TitleContainer,
        TitleName,
        FormActionButtons,
        Row,
        TextField,
        SelectField,
      ],
      ThisContext
    );

    const { pageLoad } = this.state;

    const { titleId } = pageLoad;

    const titleOptions = titleOptionsSelector(
      titleId.data.objectList,
      "titleOptions"
    );
    
    return (
      <ThisContext.Provider value={{ self: this }}>
        <TitleContainer>
          <TitleName />
          <FormActionButtons />
        </TitleContainer>
        <div style={{ padding: "15px" }}>
          <Row>
            <TextField label="Position Code" />
            <TextField label="Position Name" />
            <SelectField label="Title" name="titleId" options={titleOptions} />
          </Row>
        </div>
      </ThisContext.Provider>
    );
  }
}

export default PositionForm;
