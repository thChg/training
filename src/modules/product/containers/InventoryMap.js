import {
  createProduct,
  deleteManyProduct,
  fetchProductData,
  fetchProductList,
  importProductFromFile,
  printRecords,
} from "../actions/InventoryAction";

export function mapStateToProps(state) {
  return {
    state: state,
    inventory: state.InventoryReducer ? state.InventoryReducer.inventory : [],
    recordLength: state.InventoryReducer ? state.InventoryReducer.recordLength : 0,
    loading: state.InventoryReducer ? state.InventoryReducer.loading : false,
    permissions: state.AuthenticationReducer
      ? state.AuthenticationReducer.user.permissions
      : [],
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    fetchProductList: (page, limit) => dispatch(fetchProductList(page, limit)),
    deleteManyProduct: (products, page, limit) =>
      dispatch(deleteManyProduct(products, page, limit)),
    printRecords: (records) => dispatch(printRecords(records)),
    createProduct: (product, page, limit) =>
      dispatch(createProduct(product, page, limit)),
    importProductFromFile: (file, page, limit) =>
      dispatch(importProductFromFile(file, page, limit)),
    fetchProductData: (records) => dispatch(fetchProductData(records)),
  };
}
