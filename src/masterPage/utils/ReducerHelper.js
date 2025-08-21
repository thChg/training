import _ from "lodash";

export function getReducerInitialState(model) {
  const { data, functionName, apiEndpoint, query } = model;
  return {
    functionName,

    data: {
      // data for list
      query,
      // data for form
      object: data,
    },

    apiEndpoint,
  };
}

export function getStateProps(state, model) {
  const { functionName } = model;
  const normalizedFunctionName = _.replace(functionName, " ", "");
  const reducerName = normalizedFunctionName.concat("Reducer");
  return {
    functionName: state[reducerName].functionName,
    apiEndpoint: state[reducerName].apiEndpoint,
    data: state[reducerName].data,
    user: state.AuthenticationReducer.user,
  };
}
