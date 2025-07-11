import {
  FETCH_DELIVERY_NOTE_LIST_START,
  FETCH_DELIVERY_NOTE_LIST_FAILURE,
  FETCH_DELIVERY_NOTE_LIST_SUCCESS,
  RESOLVE_DELIVERY_NOTE_FAILURE,
} from "../actions/DeliveryNoteAction";

const initialState = {
  loading: false,
  error: null,
  deliveryNoteList: [],
  recordLength: 0,
};

const DeliveryNoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DELIVERY_NOTE_LIST_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_DELIVERY_NOTE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        deliveryNoteList: action.payload.deliveryNotes,
        recordLength: action.payload.totalDeliveryNotes,
      };
    case FETCH_DELIVERY_NOTE_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case RESOLVE_DELIVERY_NOTE_FAILURE:
      return {
        ...state,
        loding: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default DeliveryNoteReducer;
