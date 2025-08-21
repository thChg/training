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

const ThisContext = React.createContext({});

export class Title extends Component {
  constructor(props) {
    super(props);

    initFormComponent(this, props);
  }

  async componentDidMount() {
    loadFormComponentData(this);
  }

  render() {
    bindComponentToContext(
      [TitleContainer, TitleName, FormActionButtons, Row, TextField],
      ThisContext
    );

    return (
      <ThisContext.Provider value={{ self: this }}>
        <TitleContainer>
          <TitleName />
          <FormActionButtons />
        </TitleContainer>
        <div style={{ padding: "15px" }}>
          <Row>
            <TextField label="Title Code" />
            <TextField label="Title Name" />
          </Row>
        </div>
      </ThisContext.Provider>
    );
  }
}

export default Title;
