import { connect } from "react-redux";
import { getStateProps } from "../../../masterPage/utils/ReducerHelper";
import AccessList from "../components/AccessList";
import { model } from "../models/AccessModel";

function mapStateToProps(state) {
  return getStateProps(state, model);
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(AccessList);
