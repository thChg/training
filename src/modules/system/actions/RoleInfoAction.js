export const SELECT_ROLE = "SELECT_ROLE";

export function setSelectedRole(roleId) {
    return {
        type: SELECT_ROLE,
        payload: roleId,
    }
}