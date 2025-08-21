import { connect } from "react-redux";
import { getStateProps } from "../../../masterPage/utils/ReducerHelper";
import { model } from "../models/CompanyModel";
import { CompanyList } from "../component/CompanyList";

function mapStateToProps(state) {
  return getStateProps(state, model);
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyList);
