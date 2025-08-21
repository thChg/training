import { createCachedSelector } from "re-reselect";

export const SelectUserById = createCachedSelector(
  (state) => state.UserManagementReducer?.userList || [],
  (_, userId) => userId,
  (users, userId) => {
    if (!userId) return null;
    return users.find((user) => user._id === userId);
  }
)((_, userId) => userId || "null"); // fallback key to avoid crashing

