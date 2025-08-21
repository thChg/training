import createCachedSelector from "re-reselect";

export const moduleListSelector = createCachedSelector(
  (moduleList) => moduleList,
  (moduleList) => {
    if (!moduleList) return;
    return moduleList.map((m) => ({ label: m.moduleName, value: m._id }));
  }
)((moduleList, cacheKey) => cacheKey);

export const parentListSelector = createCachedSelector(
  (parentList) => parentList,
  (parentList, functionUrl) => functionUrl,
  (parentList, functionUrl) => {
    if (!parentList || typeof functionUrl !== "string") return;

    if (functionUrl.startsWith("#")) return []; 
    return parentList.reduce((acc, p) => {
      if (p.functionUrl.startsWith("#")) {
        acc.push({ label: `${p.functionUrl} - ${p.functionName}`, value: p._id });
      }
      return acc;
    }, []);
  }
)((parentList, functionUrl, cacheKey) => cacheKey);
