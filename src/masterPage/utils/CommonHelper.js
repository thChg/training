import _ from "lodash";
import { DATA_TYPE } from "../../constants/dataType";
import moment from "moment/moment";
import axiosInstance from "./AxiosInstance";
import { HTTP_METHOD } from "../../constants/httpMethod";

export function normalizeUriForRequest(endpoint, query, id) {
  let Uri = endpoint;
  if (id) {
    Uri = Uri.concat(`/${id}`);
  }

  if (query) {
    const queryString = Object.entries(query)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
    Uri = Uri.concat(`?${queryString}`);
  }
  return Uri;
}
export function normalizeDataToObject(data, object) {
  const normalizedData = Object.entries(object).reduce((acc, [key, value]) => {
    switch (value.type) {
      case DATA_TYPE.ARRAY:
        acc[key] = { ...value };
        if (Array.isArray(data?.[key])) {
          acc[key].data = data[key].map((e, idx) => {
            return normalizeDataToObject(e, value.data);
          });
        } else {
          acc[key].data = [];
        }
        return acc;

      case DATA_TYPE.STRING:
      case DATA_TYPE.PASSWORD:
        acc[key] = data?.[key] ?? "";
        break;

      case DATA_TYPE.NUMBER:
      case DATA_TYPE.CURRENCY:
        acc[key] = data?.[key] ?? 0;
        break;

      case DATA_TYPE.TIME:
        acc[key] = data?.[key]
          ? moment(data[key]).format("YYYY-MM-DD HH:mm")
          : "";
        break;

      case DATA_TYPE.ID:
        acc[key] = data?.[key] ?? "";
        break;

      default:
        acc[key] = data?.[key];
        break;
    }

    return acc;
  }, {});

  normalizedData.id = _.uniqueId();

  return normalizedData;
}

export function isObjectId(id) {
  return typeof id === "string" && /^[0-9a-fA-f]{24}$/.test(id);
}

export function createTemplateFromObjectModel(object) {
  return Object.entries(object).reduce((acc, [key, value]) => {
    switch (value.type) {
      case DATA_TYPE.NUMBER:
      case DATA_TYPE.CURRENCY:
        acc[key] = 0;
        break;
      case DATA_TYPE.ARRAY:
        acc[key] = {
          ...value,
          data: [],
        };
        break;
      default:
        acc[key] = "";
    }
    return acc;
  }, {});
}

export const sendRequest = async (method, uri, body = {}) => {
  const config = {
    params: {
      clientPath: window.location.pathname,
    },
  };

  if (
    method === HTTP_METHOD.POST ||
    method === HTTP_METHOD.PUT ||
    method === HTTP_METHOD.PATCH
  ) {
    return await axiosInstance[method](uri, body, config);
  } else {
    return await axiosInstance[method](uri, config);
  }
};
