import { fetchCreateUser } from "../actions/FetchCreateUserAction";

export function mapStateToProps(state) {
    return {
        roles: state.AuthenticationReducer ? state.AuthenticationReducer.roles : [],
    };
    }
export function mapDispatchToProps(dispatch) { 
    return {
        fetchCreateUser: (userData) => dispatch(fetchCreateUser(userData)),
    };
}