import { connect } from "react-redux";
import { getStateProps } from "../../../masterPage/utils/ReducerHelper";

import { model } from "../models/AccessModel";
import AccessForm from "../components/AccessForm";
import { NavigationWrapper } from "../../../masterPage/components/NavigationWrapper";

export function mapStateToProps(state) {
  return getStateProps(state, model);
}

export function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationWrapper(AccessForm));
