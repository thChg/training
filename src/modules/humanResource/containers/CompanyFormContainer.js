import { connect } from "react-redux";
import { getStateProps } from "../../../masterPage/utils/ReducerHelper";
import { model } from "../models/CompanyModel";
import { NavigationWrapper } from "../../../masterPage/components/NavigationWrapper";
import CompanyForm from "../component/CompanyForm";

function mapStateToProps(state) {
  return getStateProps(state, model);
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationWrapper(CompanyForm));
