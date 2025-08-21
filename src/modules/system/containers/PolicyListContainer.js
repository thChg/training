import { connect } from "react-redux";
import { getStateProps } from "../../../masterPage/utils/ReducerHelper";
import { model } from "../models/PolicyModel";
import PolicyList from "../components/PolicyList";

function mapStateToProps(state) {
  return getStateProps(state, model);
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(PolicyList);
