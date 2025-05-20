import axios from "../../../masterPage/utils/AxiosInstance";

export function CreateFetchRoleList(componentInstance) {
  return async function () {
    try {
      const response = await axios("/user/permission/role-list");
      const data = response.data;
      componentInstance.setState({ roleList: data });
    } catch (error) {
      console.error("Error fetching role list:", error);
    }
  };
}