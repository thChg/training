export function CreateSetCurrentFilter(componentInstance) {
  return function (event) {
    componentInstance.setState({ currentFilter: event.target.firstChild.data });
  };
}
