import { fetchUser } from "../auth/AuthenticationReducer";

export function mapStateToProps(state) {
  return {
    user: state.AuthenticationReducer.user,
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    fetchUser: () => dispatch(fetchUser()),
  };
}
