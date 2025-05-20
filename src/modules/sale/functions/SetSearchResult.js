export function CreateSetSearchResult(componentInstance) {
  return function setSearchResult(result) {
    componentInstance.setState({
      searchResult : result
    });
  };
}
