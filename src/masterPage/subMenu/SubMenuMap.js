export function mapStateToProps(state) {
  return {
    access: state.AuthenticationReducer ? state.AuthenticationReducer.user.access : [],
  };
}
export function mapDispatchToProps(dispatch) {
  return {};
}
