import _ from "lodash";

export const bindComponentToContext = (componentList, context) => {
  const normalizedComponentList = _.isArray(componentList)
    ? componentList
    : [componentList];

  normalizedComponentList.forEach((component) => {
    component.contextType = context;
  });
};
