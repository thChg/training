import axios from "../../../masterPage/utils/AxiosInstance";

export function CreateNewOrderPermissionHandler(componentInstance) {
  return async function newOrderHandler() {
    try {
      const response = await axios.get("/order/create/permissions");
      if (response.data === true) {
        componentInstance.setState({
          canCreateNewOrder: true,
          newOrderModalVisisble: true,
        });
      } else {
        componentInstance.setState({
          errorMessage: "You don't have permission to create a new order.",
        });
      }
    } catch (error) {
      console.error("Error fetching permissions:", error);
    }
  };
}
