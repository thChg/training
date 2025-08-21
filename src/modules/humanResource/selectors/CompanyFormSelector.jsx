import _ from "lodash";
import createCachedSelector from "re-reselect";
import RemoveLineCell from "../../../masterPage/components/RemoveLineCell";
import SelectField from "../../../masterPage/components/SelectField";

export const ceoOptionsSelector = createCachedSelector(
  (ceoList) => ceoList,
  (ceoList) => {
    if (!ceoList) return;
    return ceoList.map((c) => ({
      label: `${c.username} - ${c.fullname}`,
      value: c.companyCEOId,
    }));
  }
)((ceoId, cacheKey) => cacheKey);

export const departmentOptionsSelector = createCachedSelector(
  (departmentList) => departmentList,

  (departmentList) => {
    if (!departmentList) return [];
    return departmentList.map((d) => ({
      label: `${d.departmentCode} - ${d.departmentName}`,
      value: d.departmentId,
    }));
  }
)((departmentList, cacheKey) => cacheKey);

export const positionOptionsSelector = createCachedSelector(
  (positionList) => positionList,
  (positionList) => {
    if (!positionList) return [];
    return positionList.map((p) => ({
      label: `${p.positionCode} - ${p.positionName}`,
      value: p.positionId,
    }));
  }
)((positionList, cacheKey) => cacheKey);

export const staffOptionsSelector = createCachedSelector(
  (staffList) => staffList,
  (staffList) => {
    if (!staffList) return [];
    return staffList.map((p) => ({
      label: `${p.username} - ${p.fullname}`,
      value: p.staffId,
    }));
  }
)((staffList, cacheKey) => cacheKey);

export const renderDepartmentListTitle = () => {
  return (
    <thead>
      <tr>
        <th>Num.</th>
        <th>Department</th>
        <th>Department Manager</th>
      </tr>
    </thead>
  );
};

export const departmentListRenderSelector = createCachedSelector(
  (departmentList) => departmentList,
  (departmentList) => {
    if (departmentList.length === 0 || _.isPlainObject(departmentList)) {
      return (
        <tbody>
          <tr>
            <td colSpan="3" style={{ textAlign: "center" }}>
              No department to display.
            </td>
          </tr>
        </tbody>
      );
    }

    return (
      <tbody>
        {departmentList.map((d, i) => (
          <tr>
            <td style={{ textAlign: "center" }}>{i + 1}</td>
            <td>{d.departmentName}</td>
            <td>{`${d.managerUsername} - ${d.managerFullname}`}</td>
          </tr>
        ))}
      </tbody>
    );
  }
)((departmentList, cacheKey) => cacheKey);

export const renderStaffListTitle = () => {
  return (
    <thead>
      <tr>
        <th>Num.</th>
        <th>Department</th>
        <th>Job Position</th>
        <th>Title</th>
        <th>User</th>
      </tr>
    </thead>
  );
};

export const staffListRenderSelector = createCachedSelector(
  (staffList) => staffList,
  (staffList, departmentOptions) => departmentOptions,
  (staffList, departmentOptions, positionOptions) => positionOptions,
  (staffList, departmentOptions, positionOptions, staffOptions) => staffOptions,
  (staffList, departmentOptions, positionOptions, staffOptions) => {
    if (staffList.length === 0 || _.isPlainObject(staffList))
      return (
        <tbody>
          <tr>
            <td colSpan="7" style={{ textAlign: "center" }}>
              No staff to display.
            </td>
          </tr>
        </tbody>
      );
    return (
      <tbody>
        {staffList.map((s, i) => {
          return (
            <tr>
              <td style={{ textAlign: "center" }}>{i + 1}</td>
              <td>{`${s.departmentCode} - ${s.departmentName}`}</td>
              <td>{`${s.positionCode} - ${s.positionName}`}</td>
              <td>{`${s.titleName}`}</td>
              <td>{`${s.staffUsername} - ${s.staffFullname}`}</td>
            </tr>
          );
        })}
      </tbody>
    );
  }
)(
  (staffList, departmentList, positionList, staffOptions, cacheKey) => cacheKey
);
