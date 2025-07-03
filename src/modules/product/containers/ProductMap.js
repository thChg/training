import {
  createProduct,
  deleteManyProduct,
  fetchProductData,
  fetchProductList,
  importProductFromFile,
  printRecords,
  updateProduct,
} from "../actions/ProductAction";

export function mapStateToProps(state) {
  return {
    state: state,
    productList: state.ProductReducer ? state.ProductReducer.productList : [],
    recordLength: state.ProductReducer ? state.ProductReducer.recordLength : 0,
    loading: state.ProductReducer ? state.ProductReducer.loading : false,
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
    updateProduct: (productId, updatedProduct, page, limit) =>
      dispatch(updateProduct(productId, updatedProduct, page, limit)),
  };
}
