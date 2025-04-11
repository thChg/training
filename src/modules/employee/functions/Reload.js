export function CreateReloadHanlder(componentInstance) {
  return function () {
    componentInstance.setState((prevState) => ({
      reloadKey: prevState.reloadKey + 1,
    }));
  };
}
