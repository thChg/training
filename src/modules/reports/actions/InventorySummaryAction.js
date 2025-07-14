import axios from "../../../masterPage/utils/AxiosInstance";
import { handlePDF } from "../../../masterPage/utils/HandlePDF";

export const FETCH_INVENTORY_SUMMARY_LIST_START =
  "FETCH_INVENTORY_SUMMARY_LIST_START";
export const FETCH_INVENTORY_SUMMARY_LIST_SUCCESS =
  "FETCH_INVENTORY_SUMMARY_LIST_SUCCESS";
export const FETCH_INVENTORY_SUMMARY_LIST_FAILURE =
  "FETCH_INVENTORY_SUMMARY_LIST_FAILURE";

function fetchInventorySummaryListStart() {
  return {
    type: FETCH_INVENTORY_SUMMARY_LIST_START,
  };
}
function fetchInventorySummaryListSuccess(data) {
  return {
    type: FETCH_INVENTORY_SUMMARY_LIST_SUCCESS,
    payload: data,
  };
}
function fetchInventorySummaryListFailure(error) {
  return {
    type: FETCH_INVENTORY_SUMMARY_LIST_FAILURE,
    payload: error,
  };
}

export function fetchInventorySummaryList(page, limit) {
  return async function (dispatch) {
    try {
      dispatch(fetchInventorySummaryListStart());
      const response = await axios.get(
        `/report/stock-journal/stock?page=${page}&limit=${limit}`
      );
      dispatch(fetchInventorySummaryListSuccess(response.data));
    } catch (error) {
      console.error(error);
      dispatch(fetchInventorySummaryListFailure(error));
    }
  };
}