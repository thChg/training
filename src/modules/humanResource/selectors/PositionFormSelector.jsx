import createCachedSelector from "re-reselect";

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
