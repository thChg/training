import React, { Component } from "react";
import classes from "../../../css/modules/components/ActionButtons.module.css";
import { bindComponentToContext } from "../../../masterPage/utils/BindHelper";
import TitleContainer from "../../../masterPage/components/TitleContainer";
import TitleName from "../../../masterPage/components/TitleName";
import FormActionButtons from "../../../masterPage/components/FormActionButtons";
import Row from "../../../masterPage/components/Row";
import TextField from "../../../masterPage/components/TextField";
import ScrollContainer from "../../../masterPage/components/ScrollContainer";
import TableContainer from "../../../masterPage/components/TableContainer";
import RemoveLineButton from "../../../masterPage/components/RemoveLineCell";
import SelectField from "../../../masterPage/components/SelectField";
import {
  initFormComponent,
  loadFormComponentData,
} from "../../../masterPage/utils/FormComponentHelper";
import {
  renderFunctionListTitle,
  functionListRenderSelector,
  moduleListSelector,
  functionListSelector,
  functionListOptionSelector,
} from "../selectors/RoleFormSelector";
import FilterField from "../../../masterPage/components/FilterField";
import {
  onPageSelect,
  onSelectFieldChange,
  onSetRecordPerPage,
} from "../functions/RoleFormFunction";
import AddObjectButton from "../../../masterPage/components/AddObjectButton";

const ThisContext = React.createContext();

export class RoleForm extends Component {
  constructor(props) {
    super(props);

    initFormComponent(this, props);

    this.onPageSelect = onPageSelect.bind(this, this);
    this.onSetRecordPerPage = onSetRecordPerPage.bind(this, this);
    this.onSelectFieldChange = onSelectFieldChange.bind(this, this);
  }

  async componentDidMount() {
    await loadFormComponentData(this);
    this.setState({ length: this.state.data.functionList.data.length });
  }

  render() {
    bindComponentToContext(
      [
        TitleContainer,
        TitleName,
        FormActionButtons,
        TextField,
        TableContainer,
        ScrollContainer,
        Row,
        RemoveLineButton,
        SelectField,
        FilterField,
        AddObjectButton,
      ],
      ThisContext
    );
    const { pageLoad } =
      this.state;
    const { functionList } = this.state.data;
    const { data, filter } = functionList;
    const { onClearFilter } = this;

    const fullFunctionList =
      pageLoad["functionList.functionId"].data.objectList || [];
    const functionListOptions = functionListOptionSelector(
      data,
      fullFunctionList,
      "functionListOptions"
    );
    const moduleList = moduleListSelector(data, "moduleList");
    const filteredFunctionList = functionListSelector(
      data,
      filter,
      "filteredFunctionList"
    );

    return (
      <div>
        <ThisContext.Provider value={{ self: this }}>
          <TitleContainer>
            <TitleName />
            <FormActionButtons />
          </TitleContainer>
          <div style={{ padding: "15px" }}>
            <Row>
              <TextField label="Role Code" />
              <TextField label="Role Name" />
            </Row>
            <Row>
              <FilterField
                label="Filter by Function Name"
                type="text"
                name="functionList"
                field="functionName"
              />
              <FilterField
                label="Filter by Module Name"
                type="select"
                options={moduleList}
                name="functionList"
                field="moduleName"
              />
            </Row>
            <Row>
              <button className={classes.btn} onClick={onClearFilter}>
                Clear Filter
              </button>
            </Row>
            <ScrollContainer name="Function List" height="500px">
              <TableContainer>
                {renderFunctionListTitle()}
                {functionListRenderSelector(
                  this,
                  filteredFunctionList,
                  functionListOptions,
                  "functionList"
                )}
              </TableContainer>
            </ScrollContainer>
            <AddObjectButton name="functionList" />
          </div>
        </ThisContext.Provider>
      </div>
    );
  }
}

export default RoleForm;
