export function mapStateToProps(state) {
  return {
    userData: state.AuthenticationReducer ? state.AuthenticationReducer.user : [],
  };
}

export function mapDispatchToProps(dispatch) {
  return {};
}
