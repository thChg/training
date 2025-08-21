import createCachedSelector from "re-reselect";
import classes from "../../../css/modules/components/TextField.module.css";
import RemoveLineCell from "../../../masterPage/components/RemoveLineCell";
import _ from "lodash";

export const functionListOptionSelector = createCachedSelector(
  (functionList) => functionList,
  (functionList, fullFunctionList) => fullFunctionList,
  (functionList, fullFunctionList) => {
    if (!_.isArray(functionList)) return;

    const usedIds = _.compact(functionList.map((f) => f.functionId));
    return fullFunctionList.filter((f) => !usedIds.includes(f.functionId));
  }
)((functionList, fullFunctionList, cacheKey) => cacheKey);

export const moduleListSelector = createCachedSelector(
  (functionList) => functionList,
  (functionList) => {
    if (!_.isArray(functionList) || !functionList || functionList.length === 0)
      return [];

    return [...new Set(functionList.map((f) => f.moduleName))];
  }
)((functionList, cacheKey) => cacheKey);

export const functionListSelector = createCachedSelector(
  (functionList) => functionList,
  (functionList, filter) => filter,
  (functionList, filter) => {
    let filteredFunctionList = functionList;
    const { moduleName, functionName } = filter;
    if (moduleName) {
      filteredFunctionList = filteredFunctionList.filter(
        (f) => f.moduleName === moduleName
      );
    }

    if (functionName) {
      filteredFunctionList = filteredFunctionList.filter((f) =>
        f.functionName.includes(functionName)
      );
    }

    return filteredFunctionList;
  }
)((functionList, filter, cacheKey) => cacheKey);

export const renderFunctionListTitle = () => {
  return (
    <thead>
      <tr>
        <th>Num.</th>
        <th>Function Name</th>
        <th>Function Url</th>
        <th>Parent Name</th>
        <th>Module Name</th>
        <th></th>
      </tr>
    </thead>
  );
};

export const functionListRenderSelector = createCachedSelector(
  (self) => self,
  (self, functionList) => functionList,
  (self, functionList, functionListOptions) => functionListOptions,
  (self, functionList, functionListOptions) => {
    if (
      !_.isArray(functionList) ||
      !functionList ||
      functionList.length === 0
    ) {
      return (
        <tbody>
          <tr>
            <td colSpan="6" style={{ textAlign: "center" }}>
              No functions to display.
            </td>
          </tr>
        </tbody>
      );
    }

    return (
      <tbody>
        {_.compact(
          functionList.map((f, i) => {
            if (_.isNil(f.functionId)) {
              return (
                <tr>
                  <td style={{ textAlign: "center" }}>{i + 1}</td>
                  <td>
                    <select
                      onChange={(e) => self.onSelectFieldChange(e, i)}
                      className={classes.field}
                    >
                      <option value="">Function Name</option>
                      {functionListOptions.map((f) => (
                        <option value={f.functionId}>{f.functionName}</option>
                      ))}
                    </select>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <RemoveLineCell name="Function List" value={f.id} />
                </tr>
              );
            }
            return (
              <tr key={f.functionId}>
                <td style={{ textAlign: "center" }}>{i + 1}</td>
                <td>{f.functionName}</td>
                <td>{f.functionUrl}</td>
                <td>{f.parentName}</td>
                <td>{f.moduleName}</td>
                <RemoveLineCell name="Function List" value={f.id} />
              </tr>
            );
          })
        )}
      </tbody>
    );
  }
)((self, functionList, functionListOptions, cacheKey) => cacheKey);
