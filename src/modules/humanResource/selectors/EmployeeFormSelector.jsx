import createCachedSelector from "re-reselect";

export const companyOptionsSelector = createCachedSelector(
  (companyList) => companyList,
  (companyList) => {
    if (!companyList) return [];
    return companyList.map((t) => ({
      label: `${t.companyCode} - ${t.companyName}`,
      value: t.companyId,
    }));
  }
)((companyList, cacheKey) => cacheKey);

export const departmentOptionsSelector = createCachedSelector(
  (departmentList) => departmentList,
  (departmentList, selectedCompany) => selectedCompany,
  (departmentList, selectedCompany) => {
    if (!departmentList) return [];
    return departmentList.reduce((acc, d) => {
      d.companyId === selectedCompany &&
        acc.push({
          label: `${d.departmentCode} - ${d.departmentName}`,
          value: d.departmentId,
        });
      return acc;
    }, []);
  }
)((departmentList, selectedCompany, cacheKey) => cacheKey);

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

export const titleOptionsSelector = createCachedSelector(
  (titleList) => titleList,
  (titleList) => {
    if (!titleList) return [];
    return titleList.map((t) => ({
      label: `${t.titleCode} - ${t.titleName}`,
      value: t.titleId,
    }));
  }
)((titleList, cacheKey) => cacheKey);

export const userOptionsSelector = createCachedSelector(
  (userList) => userList,
  (userList) => {
    if (!userList) return [];
    return userList.map((u) => ({
      label: `${u.username} - ${u.fullname}`,
      value: u.userId,
    }));
  }
)((userList, cacheKey) => cacheKey);

export const companyCEOSelector = createCachedSelector(
  (username) => username,
  (username, fullname) => fullname,
  (username, fullname) => {
    if (!username || !fullname) return "";
    return `${username} - ${fullname}`;
  }
)((username, fullname, cacheKey) => cacheKey);

export const departmentManagerSelector = createCachedSelector(
  (username) => username,
  (username, fullname) => fullname,
  (username, fullname) => {
    if (!username || !fullname) return "";
    return `${username} - ${fullname}`;
  }
)((username, fullname, cacheKey) => cacheKey);

export const totalSalarySelector = createCachedSelector(
  (grossSalary) => grossSalary,
  (grossSalary, travelAllowance) => travelAllowance,
  (grossSalary, travelAllowance, mealAllowance) => mealAllowance,
  (grossSalary, travelAllowance, mealAllowance, kpiSalary) => kpiSalary,
  (grossSalary, travelAllowance, mealAllowance, kpiSalary) => {
    return (
      parseInt(grossSalary) +
      parseInt(travelAllowance) +
      parseInt(mealAllowance) +
      parseInt(kpiSalary)
    );
  }
)(
  (grossSalary, travelAllowance, mealAllowance, kpiSalary, cacheKey) => cacheKey
);
