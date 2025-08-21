import { getStateProps } from "../../../masterPage/utils/ReducerHelper";
import { model } from "../models/RoleModel";
import { connect } from "react-redux";
import RoleList from "../components/RoleList";

function mapStateToProps(state) {
  return getStateProps(state, model);
}
function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(RoleList);
