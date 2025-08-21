import createCachedSelector from "re-reselect";
import RemoveLineCell from "../../../masterPage/components/RemoveLineCell";
import _ from "lodash";
import SelectField from "../../../masterPage/components/SelectField";

export const roleOptionsSelector = createCachedSelector(
  (roleList) => roleList,
  (roleList) => {
    if (!roleList) return;

    return roleList.map((r) => ({
      value: r.roleId,
      label: `${r.roleCode} - ${r.roleName}`,
    }));
  }
)((roleList, cacheKey) => cacheKey);

export const renderRoleListHeader = () => {
  return (
    <thead>
      <tr>
        <th>Num.</th>
        <th>Role</th>
        <th></th>
      </tr>
    </thead>
  );
};
export const roleListRenderSelector = createCachedSelector(
  (roleList) => roleList,
  (roleList, roleOptions) => roleOptions,
  (roleList, roleOptions) => {
    if (!roleList || roleList.length < 1 || _.isPlainObject(roleList)) return;
    <tbody>
      <tr>
        <td colSpan={3}>No Role to display.</td>
      </tr>
    </tbody>;

    return (
      <tbody>
        {roleList.map((r, i) => {
          if (!r.roleId) {
            return (
              <tr>
                <td style={{ textAlign: "center" }}>{i + 1}</td>
                <td>
                  <SelectField
                    name="roleList.roleId"
                    options={roleOptions}
                    rowId={r.id}
                  />
                </td>
                <RemoveLineCell name="roleList" value={r.id}/>
              </tr>
            );
          }
          return (
            <tr>
              <td style={{ textAlign: "center" }}>{i + 1}</td>
              <td>{`${r.roleCode} - ${r.roleName}`}</td>
              <RemoveLineCell name="roleList" value={r.id} />
            </tr>
          );
        })}
      </tbody>
    );
  }
)((roleList, roleOptions, cacheKey) => cacheKey);
