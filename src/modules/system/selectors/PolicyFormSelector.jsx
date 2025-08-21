import _ from "lodash";
import createCachedSelector from "re-reselect";
import Select from "react-select";
import SelectField from "../../../masterPage/components/SelectField";
import TextField from "../../../masterPage/components/TextField";
import { OPERATOR_OPTIONS } from "../../../constants/operator";
import { USER_FIELD_OPTIONS } from "../../../constants/userFeature";
import RemoveLineCell from "../../../masterPage/components/RemoveLineCell";
import { onMultiFieldSelect } from "../functions/PolicyFormFunction";

export const serviceOptionsSelector = createCachedSelector(
  (serviceList) => serviceList,
  (serviceList) => {
    if (!serviceList || serviceList.length < 1) return;
    return serviceList.map((s) => ({
      label: s.serviceCode,
      value: s.serviceId,
    }));
  }
)((serviceList, cacheKey) => cacheKey);

export const functionOptionsSelector = createCachedSelector(
  (functionList) => functionList,
  (functionList) => {
    if (!functionList || functionList.length < 1) return;
    return functionList.reduce((acc, f) => {
      if (!f.functionUrl.startsWith("#"))
        acc.push({
          label: `${f.functionName} - ${f.functionUrl}`,
          value: f.functionId,
        });
      return acc;
    }, []);
  }
)((functionList, cacheKey) => cacheKey);

export const actionCodeOptionsSelector = createCachedSelector(
  (selectedServiceId) => selectedServiceId,
  (selectedServiceId, serviceList) => serviceList,
  (selectedServiceId, serviceList) => {
    if (
      !serviceList ||
      serviceList.length < 1 ||
      !selectedServiceId ||
      !serviceList
    )
      return;
    const selectedService = serviceList.find(
      (s) => s.serviceId === selectedServiceId
    );
    if (!selectedService) return;
    return selectedService.actionList.map((a) => ({
      label: a.actionCode,
      value: a.actionCode,
    }));
  }
)((selectedServiceId, serviceList, cacheKey) => cacheKey);

export const fieldListSelector = createCachedSelector(
  (selectedServiceId) => selectedServiceId,
  (selectedServiceId, serviceList) => serviceList,
  (selectedServiceId, serviceList) => {
    if (
      (!serviceList || serviceList.length < 1 || !selectedServiceId,
      !serviceList)
    )
      return;
    const selectedService = serviceList.find(
      (s) => s.serviceId === selectedServiceId
    );
    if (!selectedService) return;
    return selectedService.fieldList.map((f) => ({
      label: f.fieldName,
      value: f.fieldName,
    }));
  }
)((selectedServiceId, serviceList, cacheKey) => cacheKey);

export const renderRecordFeatureTitle = () => {
  return (
    <thead>
      <tr>
        <th>Num.</th>
        <th>Field Name</th>
        <th>Type</th>
        <th>Operator</th>
        <th>Operator By User Feature</th>
        <th>Feature Value</th>
        <th></th>
      </tr>
    </thead>
  );
};

export const recordFeatureRenderSelector = createCachedSelector(
  (self) => self,
  (self, featureList) => featureList,
  (self, featureList, fieldList) => fieldList,
  (self, featureList, fieldList) => {
    if (!featureList || _.isPlainObject(featureList) || featureList.length < 1)
      return (
        <tbody>
          <tr>
            <td colSpan={7} style={{ textAlign: "center" }}>
              No Record Feature to display.
            </td>
          </tr>
        </tbody>
      );

    return (
      <tbody>
        {featureList.map((f, i) => (
          <tr>
            <td style={{ textAlign: "center" }}>{i + 1}</td>
            <td>
              <SelectField
                name="recordFeatureList.featureName"
                rowId={f.id}
                options={fieldList}
                onSelect={self.onSelectFeature}
              />
            </td>
            <td style={{ textAlign: "center" }}>{f.type}</td>
            <td>
              <SelectField
                name="recordFeatureList.operator"
                rowId={f.id}
                options={OPERATOR_OPTIONS}
                onSelect={self.onSelectFeature}
              />
            </td>
            <td style={{ textAlign: "center" }}>
              <input
                type="checkbox"
                checked={f.isUserFeature}
                onChange={self.handleIsUserFeatureToggle}
                data-row-id={f.id}
                name="recordFeatureList"
              />
            </td>
            <td>
              {f.isUserFeature ? (
                <SelectField
                  name="recordFeatureList.featureValue"
                  options={USER_FIELD_OPTIONS}
                  rowId={f.id}
                  onSelect={self.onSelectFeature}
                />
              ) : (
                <TextField name="recordFeatureList.featureValue" rowId={f.id} />
              )}
            </td>
            <RemoveLineCell name="recordFeatureList" value={f.id} />
          </tr>
        ))}
      </tbody>
    );
  }
)((self, featureList, fieldList, cacheKey) => cacheKey);

export const renderUserFeatureTitle = () => {
  return (
    <thead>
      <tr>
        <th>Num.</th>
        <th>Field Name</th>
        <th>Operator</th>
        <th>Field Value</th>
        <th></th>
      </tr>
    </thead>
  );
};

export const userFeatureRenderSelector = createCachedSelector(
  (self) => self,
  (self, featureList) => featureList,
  (self, featureList) => {
    if (!featureList || _.isPlainObject(featureList) || featureList.length < 1)
      return (
        <tbody>
          <tr>
            <td colSpan={5} style={{ textAlign: "center" }}>
              No User Feature to display.
            </td>
          </tr>
        </tbody>
      );

    return (
      <tbody>
        {featureList.map((f, i) => (
          <tr>
            <td style={{ textAlign: "center" }}>{i + 1}</td>
            <td>
              <SelectField
                name="userFeatureList.featureName"
                options={USER_FIELD_OPTIONS}
                rowId={f.id}
                onSelect={self.onSelectUserField}
              />
            </td>
            <td>
              <SelectField
                name="userFeatureList.operator"
                options={OPERATOR_OPTIONS}
                rowId={f.id}
                onSelect={self.onSelectFeature}
              />
            </td>
            <td>
              {f.operator === "$in" || f.operator === "$nin" ? (
                <Select
                  isMulti
                  options={f.featureOptions}
                  onChange={(event) => onMultiFieldSelect(self, event, f.id)}
                />
              ) : (
                <SelectField
                  name="userFeatureList.featureValue"
                  options={f.featureOptions}
                  rowId={f.id}
                  onSelect={self.onSelectFeature}
                />
              )}
            </td>
            <RemoveLineCell name="userFeatureList" value={f.id} />
          </tr>
        ))}
      </tbody>
    );
  }
)((self, featureList, cacheKey) => cacheKey);
