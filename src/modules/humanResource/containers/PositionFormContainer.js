import { connect } from "react-redux";
import { getStateProps } from "../../../masterPage/utils/ReducerHelper";
import { model } from "../models/PositionModel";
import { NavigationWrapper } from "../../../masterPage/components/NavigationWrapper";
import PositionForm from "../component/PositionForm";

function mapStateToProps(state) {
  return getStateProps(state, model);
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationWrapper(PositionForm));
