import { connect } from "react-redux";
import { getStateProps } from "../../../masterPage/utils/ReducerHelper";
import { model } from "../models/EmployeeModel";
import { NavigationWrapper } from "../../../masterPage/components/NavigationWrapper";
import EmployeeForm from "../component/EmployeeForm";

function mapStateToProps(state) {
  return getStateProps(state, model);
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationWrapper(EmployeeForm));
