export function CreateSetSelectedUserId(componentInstance) {
  return function (userId) {
    componentInstance.setState({
      selectedUserId: userId,
    });
  };
}