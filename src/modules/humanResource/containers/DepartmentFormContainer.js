import { connect } from "react-redux";
import { getStateProps } from "../../../masterPage/utils/ReducerHelper";
import { model } from "../models/DepartmentModel";
import { NavigationWrapper } from "../../../masterPage/components/NavigationWrapper";
import DepartmentForm from "../component/DepartmentForm";

function mapStateToProps(state) {
  return getStateProps(state, model);
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationWrapper(DepartmentForm));
