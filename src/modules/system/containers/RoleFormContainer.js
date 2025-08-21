import { getStateProps } from "../../../masterPage/utils/ReducerHelper";
import { model } from "../models/RoleModel";
import { connect } from "react-redux";
import RoleForm from "../components/RoleForm";
import { NavigationWrapper } from "../../../masterPage/components/NavigationWrapper";

function mapStateToProps(state) {
  return getStateProps(state, model);
}
function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationWrapper(RoleForm));
