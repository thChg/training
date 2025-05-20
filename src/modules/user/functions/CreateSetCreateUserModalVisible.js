export function CreateSetCreateUserModalVisible(componentInstance) {
  return function () {
    componentInstance.setState((prevState) => ({
      CreateUserModalVisible: !prevState.CreateUserModalVisible,
    }));
  };
}
