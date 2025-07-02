import axios from "../../../masterPage/utils/AxiosInstance";
import { handlePDF } from "../../../masterPage/utils/HandlePDF";

export const FETCH_PRODUCT_LIST_START = "FETCH_PRODUCT_LIST_START";
export const FETCH_PRODUCT_LIST_SUCCESS = "FETCH_PRODUCT_LIST_SUCCESS";
export const FETCH_PRODUCT_LIST_FAILURE = "FETCH_PRODUCT_LIST_FAILURE";
export const DELETE_MANY_PRODUCT_FAILURE = "DELETE_MANY_PRODUCT_FAILURE";
export const PRINT_RECORDS_FAILURE = "PRINT_RECORDS_FAILURE";
export const CREATE_PRODUCT_FAILURE = "CREATE_PRODUCT_FAILURE";
export const IMPORT_PRODUCT_FROM_FILE_FAILURE =
  "IMPORT_PRODUCT_FROM_FILE_FAILURE";
export const FETCH_PRODUCT_DATA_FAILURE = "FETCH_PRODUCT_DATA_FAILURE";

function fetchProductListStart() {
  return {
    type: FETCH_PRODUCT_LIST_START,
  };
}
function fetchProductListSuccess(data) {
  return {
    type: FETCH_PRODUCT_LIST_SUCCESS,
    payload: data,
  };
}
function fetchProductListFailure(error) {
  return {
    type: FETCH_PRODUCT_LIST_FAILURE,
    payload: error,
  };
}

function deleteManyProductFailure(error) {
  return {
    type: DELETE_MANY_PRODUCT_FAILURE,
    payload: error,
  };
}
function createProductFailure(error) {
  return {
    type: CREATE_PRODUCT_FAILURE,
    payload: error,
  };
}
function importProductFromFileFailure(error) {
  return {
    type: IMPORT_PRODUCT_FROM_FILE_FAILURE,
    payload: error,
  };
}
function fetchProductDataFailure(error) {
  return { type: FETCH_PRODUCT_DATA_FAILURE, payload: error };
}

export function fetchProductList(page, limit) {
  return async function (dispatch) {
    try {
      dispatch(fetchProductListStart());
      const response = await axios.get(
        `/product/inventory/inventory-list?page=${page}&limit=${limit}`
      );
      dispatch(fetchProductListSuccess(response.data));
    } catch (error) {
      console.error(error);
      dispatch(fetchProductListFailure(error));
    }
  };
}

export function deleteManyProduct(products, page, limit) {
  return async function (dispatch) {
    try {
      await axios.post("/product/vendor/delete-many", products);
      dispatch(fetchProductList(page, limit));
    } catch (error) {
      dispatch(deleteManyProductFailure(error));
      console.error(error);
    }
  };
}

export function printRecordsFailure(error) {
  return {
    type: PRINT_RECORDS_FAILURE,
    payload: error,
  };
}

export function printRecords(records) {
  return async function (dispatch) {
    try {
      await handlePDF("/product/vendor/print", records);
    } catch (error) {
      console.error(error);
      dispatch(printRecordsFailure(error));
    }
  };
}

export function createProduct(product, page, limit) {
  return async function (dispatch) {
    try {
      await axios.post("/product/vendor/create-product", product);
      dispatch(fetchProductList(page, limit));
    } catch (error) {
      console.error(error);
      dispatch(createProductFailure(error));
    }
  };
}

export function importProductFromFile(file, page, limit) {
  return async function (dispatch) {
    try {
      const formData = new FormData();
      formData.append("file", file);
      await axios.post("/product/vendor/create-many", formData);
      dispatch(fetchProductList(page, limit));
    } catch (error) {
      console.error(error);
      dispatch(importProductFromFileFailure(error));
    }
  };
}

export function fetchProductData(records) {
  return async function (dispatch) {
    try {
      const response = await axios.post("/product/vendor/product-data", records);
      return response.data;
    } catch (error) {
      console.error(error);
      dispatch(fetchProductDataFailure(error));
    }
  };
}
