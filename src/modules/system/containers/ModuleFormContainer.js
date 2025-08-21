import { connect } from "react-redux";
import { getStateProps } from "../../../masterPage/utils/ReducerHelper";
import { model } from "../models/ModuleModel";
import ModuleForm from "../components/ModuleForm";
import { NavigationWrapper } from "../../../masterPage/components/NavigationWrapper";

function mapStateToProps(state) {
  return getStateProps(state, model);
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationWrapper(ModuleForm));
