import axios from "../../../masterPage/utils/AxiosInstance";

export const FETCH_USER_LIST_START = "FETCH_USER_LIST_START";
export const FETCH_USER_LIST_SUCCESS = "FETCH_USER_LIST_SUCCESS";
export const FETCH_USER_LIST_FAILURE = "FETCH_USER_LIST_FAILURE";
export const IMPORT_USER_FROM_FILE_FAILURE = "IMPORT_USER_FROM_FILE_FAILURE";
export const CREATE_USER_FAILURE = "CREATE_USER_FAILURE";
export const UPDATE_USER_FAILURE = "UPDATE_USER_FAILURE";
export const DELETE_USER_FAILURE = "DELETE_USER_FAILURE";
export const DELETE_MANY_USERS_FAILURE = "DELETE_MANY_USERS_FAILURE";
export const PRINT_RECORDS_FAILURE = "PRINT_RECORDS_FAILURE";
export const FETCH_SELECTED_RECORD_DATA_FAILURE = "FETCH_SELECTED_RECORD_DATA_FAILURE";

function fetchUserListStart() {
  return {
    type: FETCH_USER_LIST_START,
  };
}

function fetchUserListSuccess(data) {
  return {
    type: FETCH_USER_LIST_SUCCESS,
    payload: data,
  };
}

function fetchUserListFailure(error) {
  return {
    type: FETCH_USER_LIST_FAILURE,
    payload: error,
  };
}
function createUserFailure(error) {
  return {
    type: CREATE_USER_FAILURE,
    payload: error,
  };
}
function updateUserFailure(error) {
  return {
    type: UPDATE_USER_FAILURE,
    payload: error,
  };
}
function deleteUserFailure(error) {
  return { type: DELETE_USER_FAILURE, payload: error };
}
function importUserFromFileFailure(error) {
  return {
    type: IMPORT_USER_FROM_FILE_FAILURE,
    payload: error,
  };
}
function deleteManyUsersFailure(error) {
  return {
    type: DELETE_MANY_USERS_FAILURE,
    payload: error,
  };
}
function printRecordsFailure(error) {
  return {
    type: PRINT_RECORDS_FAILURE,
    payload: error,
  };
}
function fetchSelectedRecordDataFailure(error) {
  return {
    type: FETCH_SELECTED_RECORD_DATA_FAILURE,
    payload: error,
  }
}

export function fetchUserList(page, limit) {
  return async function (dispatch) {
    dispatch(fetchUserListStart());
    try {
      const response = await axios.get(
        `/user/list?page=${page}&limit=${limit}`
      );
      dispatch(fetchUserListSuccess(response.data));
    } catch (error) {
      console.error("Error fetching user list:", error);
      dispatch(fetchUserListFailure(error));
    }
  };
}

export function createUser(userData, page, limit) {
  return async function (dispatch) {
    try {
      console.log(userData);
      await axios.post("/auth/register", userData);
      dispatch(fetchUserList(page, limit));
    } catch (error) {
      console.error("Error creating user: ", error);
      dispatch(createUserFailure(error));
    }
  };
}

export function updateUser(userId, userData, page, limit) {
  return async function (dispatch) {
    try {
      await axios.put(`/user/update/${userId}`, userData);
      dispatch(fetchUserList(page, limit));
    } catch (error) {
      console.error("Error updating user:", error);
      dispatch(updateUserFailure(error));
    }
  };
}

export function deleteUser(userId, page, limit) {
  return async function (dispatch) {
    try {
      await axios.delete(`/user/delete/${userId}`);
      dispatch(fetchUserList(page, limit));
    } catch (error) {
      console.error("Error deleting user:", error);
      dispatch(deleteUserFailure(error));
    }
  };
}

export function importUserFromFile(file, page, limit) {
  return async function (dispatch) {
    try {
      const formData = new FormData();
      formData.append("file", file);
      await axios.post("/auth/import", formData);
      dispatch(fetchUserList(page, limit));
    } catch (error) {
      console.error("Error importing users from file:", error);
      dispatch(importUserFromFileFailure(error));
    }
  };
}

export function deleteManyUsers(users, page, limit) {
  return async function (dispatch) {
    try {
      await axios.post(`/user/delete-many`, { users });
      dispatch(fetchUserList(page, limit));
    } catch (error) {
      console.error(error);
      dispatch(deleteManyUsersFailure(error));
    }
  };
}

export function printRecords(records) {
  return async function (dispatch) {
    try {
      const response = await axios.post("/user/print", records, {
        responseType: "blob",
      });
      const blob = new Blob([response.data], { type: "application/pdf" });
      const fileURL = URL.createObjectURL(blob);
      window.open(fileURL);
    } catch (error) {
      console.error(error);
      dispatch(printRecordsFailure(error));
    }
  };
}

export function fetchSelectedRecordData(records) {
  return async function (dispatch) {
    try {
      const response = await axios.post("/user/selected-list", records);
      return response.data;
    } catch (error) {
      console.error(error);
      dispatch(fetchSelectedRecordDataFailure(error))
    }
  };
}
