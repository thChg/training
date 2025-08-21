import { connect } from "react-redux";
import { getStateProps } from "../../../masterPage/utils/ReducerHelper";
import { model } from "../models/PolicyModel";
import PolicyForm from "../components/PolicyForm";
import { NavigationWrapper } from "../../../masterPage/components/NavigationWrapper";

function mapStateToProps(state) {
  return getStateProps(state, model);
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationWrapper(PolicyForm));
