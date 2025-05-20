import { deleteOrderError, fetchCreateOrderPermission, fetchOrder, fetchViewPermission } from "../actions/OrderActions";

export function mapStateToProps(state) {
    return {
        orders: state.orderReducer ? state.orderReducer.orders : [],
        loading: state.orderReducer ? state.orderReducer.loading : false,
        error: state.orderReducer ? state.orderReducer.error : null,
        canView: state.orderReducer ? state.orderReducer.canView : false,
    }
};

export function mapDispatchToProps(dispatch) {
    return {
        fetchOrder: () => dispatch(fetchOrder()),
        fetchViewPermission: () => dispatch(fetchViewPermission()),
        fetchCreatePermission: () => dispatch(fetchCreateOrderPermission()),
        deleteOrderError: () => dispatch(deleteOrderError()),
    }
};
