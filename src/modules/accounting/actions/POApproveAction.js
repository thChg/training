import axios from "../../../masterPage/utils/AxiosInstance";
import { handlePDF } from "../../../masterPage/utils/HandlePDF";

export const PRINT_RECORDS_FAILURE = "PRINT_RECORDS_FAILURE";
export const FETCH_PRODUCT_DATA_FAILURE = "FETCH_PRODUCT_DATA_FAILURE";


function fetchProductDataFailure(error) {
  return { type: FETCH_PRODUCT_DATA_FAILURE, payload: error };
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
