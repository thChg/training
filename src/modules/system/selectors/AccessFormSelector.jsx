import _ from "lodash";
import createCachedSelector from "re-reselect";

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
      </tr>
    </thead>
  );
};

export const recordFeatureRenderSelector = createCachedSelector(
  (featureList) => featureList,
  (featureList) => {
    if (!featureList || _.isPlainObject(featureList) || featureList.length < 1)
      return (
        <tbody>
          <tr>
            <td colSpan={6} style={{ textAlign: "center" }}>
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
            <td>{f.featureName}</td>
            <td style={{ textAlign: "center" }}>{f.type}</td>
            <td>{f.operator}</td>
            <td style={{ textAlign: "center" }}>{f.isUserFeature}</td>
            <td>{f.featureValue}</td>
          </tr>
        ))}
      </tbody>
    );
  }
)((featureList, cacheKey) => cacheKey);

export const renderUserFeatureTitle = () => {
  return (
    <thead>
      <tr>
        <th>Num.</th>
        <th>Field Name</th>
        <th>Operator</th>
        <th>Field Value</th>
      </tr>
    </thead>
  );
};

export const userFeatureRenderSelector = createCachedSelector(
  (featureList) => featureList,
  (featureList) => {
    if (!featureList) return;
    if (!featureList || _.isPlainObject(featureList) || featureList.length < 1)
      return (
        <tbody>
          <tr>
            <td colSpan={4} style={{ textAlign: "center" }}>
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
            <td>{f.featureName}</td>
            <td>{f.operator}</td>
            <td>{f.featureValue}</td>
          </tr>
        ))}
      </tbody>
    );
  }
)((featureList, cacheKey) => cacheKey);
