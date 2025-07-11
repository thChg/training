import axios from "../../../masterPage/utils/AxiosInstance";

export const FETCH_DELIVERY_NOTE_LIST_START = "FETCH_DELIVERY_NOTE_LIST_START";
export const FETCH_DELIVERY_NOTE_LIST_SUCCESS =
  "FETCH_DELIVERY_NOTE_LIST_SUCCESS";
export const FETCH_DELIVERY_NOTE_LIST_FAILURE =
  "FETCH_DELIVERY_NOTE_LIST_FAILURE";
export const RESOLVE_DELIVERY_NOTE_FAILURE = "RESOLVE_DELIVERY_NOTE_FAILURE";

function fetchDeliveryNoteListStart() {
  return {
    type: FETCH_DELIVERY_NOTE_LIST_START,
  };
}
function fetchDeliveryNoteListSuccess(data) {
  return {
    type: FETCH_DELIVERY_NOTE_LIST_SUCCESS,
    payload: data,
  };
}
function fetchDeliveryNoteListFailure(error) {
  return {
    type: FETCH_DELIVERY_NOTE_LIST_FAILURE,
    payload: error,
  };
}
function resolveDeliveryNoteFailure(error) {
  return {
    type: RESOLVE_DELIVERY_NOTE_FAILURE,
    payload: error,
  };
}

export function fetchDeliveryNoteList(page, limit) {
  return async function (dispatch) {
    try {
      dispatch(fetchDeliveryNoteListStart());
      const response = await axios.get(
        `/product/delivery-note/delivery-note-list?page=${page}&limit=${limit}`
      );
      dispatch(fetchDeliveryNoteListSuccess(response.data));
    } catch (error) {
      console.error(error);
      dispatch(fetchDeliveryNoteListFailure(error));
    }
  };
}

export function resolveDeliveryNote(id, action) {
  return async function (dispatch) {
    try {
      await axios.post(`/product/delivery-note/resolve/${id}`, { action });
      fetchDeliveryNoteList(1, 10);
    } catch (error) {
      console.error(error);
      dispatch(resolveDeliveryNoteFailure(error));
    }
  };
}
