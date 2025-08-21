import _ from "lodash";
import createCachedSelector from "re-reselect";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";

export const renderActionListTitle = () => {
  return (
    <thead>
      <tr>
        <th>Num.</th>
        <th>Action Code</th>
        <th>Path</th>
        <th>HTTP Method</th>
      </tr>
    </thead>
  );
};

export const actionListRenderSelector = createCachedSelector(
  (actionList) => actionList,
  (actionList) => {
    if (!actionList || actionList.length < 1 || _.isPlainObject(actionList))
      return (
        <tbody>
          <tr>
            <td colSpan={4} style={{ textAlign: "center" }}>
              No Actions to display
            </td>
          </tr>
        </tbody>
      );

    return (
      <tbody>
        {actionList.map((a, i) => (
          <tr>
            <td style={{ textAlign: "center" }}>{i + 1}</td>
            <td>{a.actionCode}</td>
            <td>{a.path}</td>
            <td>{_.toUpper(a.method)}</td>
          </tr>
        ))}
      </tbody>
    );
  }
)((actionList, cacheKey) => cacheKey);

export const renderFieldListTitle = () => {
  return (
    <thead>
      <tr>
        <th>Num.</th>
        <th>Field Name</th>
        <th>Field Type</th>
        <th>Required</th>
      </tr>
    </thead>
  );
};

export const fieldListRenderSelector = createCachedSelector(
  (fieldList) => fieldList,
  (fieldList) => {
    if (!fieldList || fieldList.length < 1 || _.isPlainObject(fieldList))
      return (
        <tbody>
          <tr>
            <td colSpan={4} style={{ textAlign: "center" }}>
              No Fields to display
            </td>
          </tr>
        </tbody>
      );

    return (
      <tbody>
        {fieldList.map((f, i) => (
          <tr>
            <td style={{ textAlign: "center" }}>{i + 1}</td>
            <td>{f.fieldName}</td>
            <td style={{ textAlign: "center" }}>{f.fieldType}</td>
            <td style={{ textAlign: "center" }}>
              {f.required ? <FaCheckCircle /> : <FaRegCircle />}
            </td>
          </tr>
        ))}
      </tbody>
    );
  }
)((fieldList, cacheKey) => cacheKey);
