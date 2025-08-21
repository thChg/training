import _ from "lodash";
import createCachedSelector from "re-reselect";
import RemoveLineCell from "../../../masterPage/components/RemoveLineCell";
import SelectField from "../../../masterPage/components/SelectField";

export const managerOptionsSelector = createCachedSelector(
  (managerList) => managerList,

  (managerList) => {
    if (!managerList || managerList.length < 1) return;
    return managerList.map((m) => ({
      label: `${m.username} - ${m.fullname}`,
      value: m.managerId,
    }));
  }
)((managerList, cacheKey) => cacheKey);

export const companyOptionsSelector = createCachedSelector(
  (companyList) => companyList,

  (companyList) => {
    if (!companyList || companyList.length < 1) return;
    return companyList.map((c) => ({
      label: `${c.companyCode} - ${c.companyName}`,
      value: c.companyId,
    }));
  }
)((companyList, cacheKey) => cacheKey);

export const companyCEOSelector = createCachedSelector(
  (username) => username,
  (username, fullname) => fullname,
  (username, fullname) => {
    if (!username || !fullname) return "";
    return `${username} - ${fullname}`;
  }
)((username, fullname, cacheKey) => cacheKey);

export const staffOptionsSelector = createCachedSelector(
  (staffList) => staffList,
  (staffList) => {
    if (!staffList || staffList.length < 1) return [];

    return staffList.reduce((acc, s) => {
      acc.push({
        label: `${s.username} - ${s.fullname}`,
        value: s.staffId,
      });
      return acc;
    }, []);
  }
)((staffList, cacheKey) => cacheKey);

export const positionOptionsSelector = createCachedSelector(
  (positionList) => positionList,
  (positionList) => {
    if (!positionList || positionList.length < 1) return;
    return positionList.map((p) => ({
      label: `${p.positionCode} - ${p.positionName}`,
      value: p.positionId,
    }));
  }
)((positionList, cacheKey) => cacheKey);

export const renderStaffListTitle = () => {
  return (
    <thead>
      <tr>
        <th>Num.</th>
        <th>Job Position</th>
        <th>Title</th>
        <th>User</th>
        <th></th>
      </tr>
    </thead>
  );
};

export const staffListRenderSelector = createCachedSelector(
  (staffList) => staffList,
  (staffList, staffOptions) => staffOptions,
  (staffList, staffOptions, positionOptions) => positionOptions,
  (staffList, staffOptions, positionOptions) => {

    if (!staffList || staffList.length < 1 || _.isPlainObject(staffList))
      return (
        <tbody>
          <tr>
            <td colSpan={5} style={{ textAlign: "center" }}>
              No staffs to display.
            </td>
          </tr>
        </tbody>
      );
    return (
      <tbody>
        {staffList.map((s, i) => {
          if (_.some(s, (e) => _.isNil(e)))
            return (
              <tr>
                <td style={{ textAlign: "center" }}>{i + 1}</td>
                <td>
                  <SelectField
                    name="staffList.positionId"
                    options={positionOptions}
                    rowId={s.id}
                  />
                </td>
                <td>{s.titleName}</td>
                <td>
                  <SelectField
                    name="staffList.staffId"
                    options={staffOptions}
                    rowId={s.id}
                  />
                </td>
                <RemoveLineCell name="staffList" value={s.id} />
              </tr>
            );
          return (
            <tr>
              <td style={{ textAlign: "center" }}>{i + 1}</td>
              <td>{`${s.positionCode} - ${s.positionName}`}</td>
              <td>{s.positionName}</td>
              <td>{`${s.staffUsername} - ${s.staffFullname}`}</td>
              <RemoveLineCell name="staffList" value={s.id} />
            </tr>
          );
        })}
      </tbody>
    );
  }
)((staffList, staffOptions, positionOptions, cacheKey) => cacheKey);
