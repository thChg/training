export function CreateComputeFilterCount(componentInstance) {
  return function (tableData, filter) {
    const result = {};
    filter.forEach(
      (element) =>
        (result[element] =
          element === "All"
            ? tableData.length
            : tableData.filter((record) => record[element]).length)
    );
    componentInstance.setState({ filterCount: result });
  };
}
