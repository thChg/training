import React, { Component } from "react";
import classes from "../../../css/modules/components/ActionButtons.module.css";
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
import ScrollContainer from "../../../masterPage/components/ScrollContainer";
import TableContainer from "../../../masterPage/components/TableContainer";
import { onGetSwagger } from "../functions/ResourceFormFunction";
import {
  actionListRenderSelector,
  renderActionListTitle,
  renderFieldListTitle,
  fieldListRenderSelector,
} from "../selectors/ResourceFormSelector";

const ThisContext = React.createContext({});

export class ResourceForm extends Component {
  constructor(props) {
    super(props);

    initFormComponent(this, props);

    this.onGetSwagger = onGetSwagger.bind(this, this);
  }

  async componentDidMount() {
    await loadFormComponentData(this);
  }

  render() {
    bindComponentToContext(
      [TextField, TitleName, FormActionButtons],
      ThisContext
    );
    const { actionList, fieldList } = this.state.data;

    return (
      <ThisContext.Provider value={{ self: this }}>
        <TitleContainer>
          <TitleName />
          <FormActionButtons />
        </TitleContainer>
        <div style={{ padding: "15px" }}>
          <Row>
            <TextField label="Service Code" />
            <TextField label="Service Name" />
          </Row>
          <Row>
            <button className={classes.btn} onClick={this.onGetSwagger}>
              Get swagger
            </button>
          </Row>
          <ScrollContainer name="Action List" height="300px">
            <TableContainer>
              {renderActionListTitle()}
              {actionListRenderSelector(actionList.data, "actionList")}
            </TableContainer>
          </ScrollContainer>
          <ScrollContainer name="Field List" height="300px">
            <TableContainer>
              {renderFieldListTitle()}
              {fieldListRenderSelector(fieldList.data, "fieldList")}
            </TableContainer>
          </ScrollContainer>
        </div>
      </ThisContext.Provider>
    );
  }
}

export default ResourceForm;
