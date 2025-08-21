import React, { Component } from "react";
import {
  initFormComponent,
  loadFormComponentData,
} from "../../../masterPage/utils/FormComponentHelper";
import TitleContainer from "../../../masterPage/components/TitleContainer";
import TitleName from "../../../masterPage/components/TitleName";
import FormActionButtons from "../../../masterPage/components/FormActionButtons";
import { bindComponentToContext } from "../../../masterPage/utils/BindHelper";
import TextField from "../../../masterPage/components/TextField";
import Row from "../../../masterPage/components/Row";
import ScrollContainer from "../../../masterPage/components/ScrollContainer";
import TableContainer from "../../../masterPage/components/TableContainer";
import {
  renderRoleListHeader,
  roleListRenderSelector,
  roleOptionsSelector,
} from "../selectors/UserFormSelector";
import RemoveLineCell from "../../../masterPage/components/RemoveLineCell";
import AddObjectButton from "../../../masterPage/components/AddObjectButton";
import SelectField from "../../../masterPage/components/SelectField";
import FillerField from "../../../masterPage/components/FillerField";
import { handleCreate } from "../functions/UserFormFunction";

const ThisContext = React.createContext({});

export class UserForm extends Component {
  constructor(props) {
    super(props);

    initFormComponent(this, props);

    this.handleCreate = handleCreate.bind(this, this);
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
        TextField,
        RemoveLineCell,
        AddObjectButton,
        SelectField,
      ],
      ThisContext
    );
    console.log(this.state);
    const { pageLoad } = this.state;
    const { roleList } = this.state.data;
    const roleId = pageLoad["roleList.roleId"];
    const roleOptions = roleOptionsSelector(
      roleId.data.objectList,
      "roleOptions"
    );
    return (
      <ThisContext.Provider value={{ self: this }}>
        <TitleContainer>
          <TitleName />
          <FormActionButtons handleCreate={this.handleCreate} />
        </TitleContainer>
        <div style={{ padding: "15px" }}>
          <Row>
            <TextField label="Username" />
            <TextField label="Fullname" />
            <TextField label="Email" />
            <TextField label="Phone" />
          </Row>
          <Row>
            <TextField label="Password" />
            <TextField label="Verify Password" />
            <FillerField />
            <FillerField />
          </Row>
          <ScrollContainer name="Role List" height="400px">
            <TableContainer>
              {renderRoleListHeader()}
              {roleListRenderSelector(
                roleList.data,
                roleOptions,
                "roleListRender"
              )}
            </TableContainer>
          </ScrollContainer>
          <AddObjectButton name="roleList" />
        </div>
      </ThisContext.Provider>
    );
  }
}

export default UserForm;
