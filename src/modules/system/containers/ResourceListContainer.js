import { connect } from "react-redux";
import { getStateProps } from "../../../masterPage/utils/ReducerHelper";
import { model } from "../models/ResourceModel";
import ResourceList from "../components/ResourceList";

function mapStateToProps(state) {
  return getStateProps(state, model);
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ResourceList);
