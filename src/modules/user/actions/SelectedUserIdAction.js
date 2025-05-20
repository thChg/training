export const SET_SELECTED_USER_ID = "SET_SELECTED_USER_ID";

export function setSelectedUserId (userId) {
    return {
        type: SET_SELECTED_USER_ID,
        payload: userId,
    }
}
