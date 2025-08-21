import { handleLogin, handleLogout } from "./AuthenticationReducer";

export function mapStateToProps(state) {
  return {
    loading: state.AuthenticationReducer.loading,
    user: state.AuthenticationReducer.user,
    error: state.AuthenticationReducer.error,
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    handleLogin: (user) => dispatch(handleLogin(user)),
    handleLogout: () => dispatch(handleLogout()),
  };
}