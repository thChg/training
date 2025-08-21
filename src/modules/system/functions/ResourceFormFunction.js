import { HTTP_METHOD } from "../../../constants/httpMethod";
import { sendRequest } from "../../../masterPage/utils/CommonHelper";

export async function onGetSwagger(self) {
  try {
    const { serviceName } = self.state.data;

    if (!serviceName) {
      alert("Fill required field Service Name!");
      return;
    }

    const response = await sendRequest(
      HTTP_METHOD.GET,
      `${serviceName}/swagger`
    );

    const { paths, definitions } = response.data;
    const { properties, required } = definitions;
    const actionList = [];
    const fieldList = [];

    Object.entries(paths).forEach(([pathKey, pathValue]) => {
      Object.entries(pathValue).forEach(([actionKey, actionValue]) => {
        actionList.push({
          path: pathKey,
          actionCode: actionValue.operationId,
          method: actionKey,
        });
      });
    });

    Object.entries(properties).forEach(([key, value]) => {
      const elem = { fieldName: key, fieldType: value.type };
      if (required.includes(key)) elem["required"] = true;
      fieldList.push(elem);
    });

    self.setState((prevState) => ({
      data: {
        ...prevState.data,
        actionList: {
          ...prevState.data.actionList,
          data: actionList,
        },
        fieldList: {
          ...prevState.data.fieldList,
          data: fieldList,
        },
      },
    }));
  } catch (error) {
    console.error(error);
  }
}
