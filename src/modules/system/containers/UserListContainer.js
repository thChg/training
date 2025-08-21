import { connect } from "react-redux";
import { getStateProps } from "../../../masterPage/utils/ReducerHelper";
import UserList from "../components/UserList";
import { model } from "../models/UserModel";

function mapStateToProps(state) {
  return getStateProps(state, model);
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
