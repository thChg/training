export function CreateHandleCurrentFilter(componentInstance) {
  return function (filter, employees) {
    let trimFilter = filter.trim();
    componentInstance.setState({
      searchResult:
        trimFilter == "All"
          ? employees
          : employees.filter((employee) => employee[trimFilter]),
    });
  };
}
