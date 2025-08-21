import { connect } from "react-redux";
import { getStateProps } from "../../../masterPage/utils/ReducerHelper";
import { model } from "../models/ResourceModel";
import ResourceForm from "../components/ResourceForm";
import { NavigationWrapper } from "../../../masterPage/components/NavigationWrapper";

function mapStateToProps(state) {
  return getStateProps(state, model);
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationWrapper(ResourceForm));
