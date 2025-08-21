export function onSelectFieldChange(self, event, index) {
  const fullFunctionList = self.state.pageLoad["functionList.functionId"].data.objectList;
  const selectedFunctionId = event.target.value;

  const { data: functionList } = self.state.data.functionList;
  const selectedFunction = fullFunctionList.find((f) => f.functionId === selectedFunctionId);

  const newFunctionList = [
    ...functionList.slice(0, index),
    selectedFunction,
    ...functionList.slice(index + 1),
  ];

  self.setState((prevState) => ({
    data: {
      ...prevState.data,
      functionList: {
        ...prevState.data.functionList,
        data: newFunctionList,
      },
    },
  }));
}

export function onPageSelect(self) {}

export function onSetRecordPerPage(self) {}