import { forEach } from 'lodash';

export const createQueryPath = (arrayPath: string[]) => {
  const arrayLength = arrayPath.length;
  const rootName = arrayPath[0];
  const nodeName = arrayLength > 1 ? 'root' : 'parent';
  // cannot be parent if length is longer than 2, it has to be the last element of the loop
  let path = `MATCH (${nodeName}: Topic:Root {name: "${rootName}"})`;
  if (arrayLength > 1) {
    path += extractPath(arrayPath.slice(1, arrayLength));
  }
  return path;
};

const extractPath = (array: string[]) => {
  let restPath = '';
  forEach(array, (nodeNameAttribute: string, index: number) => {
    // The last node always has to have parent name.
    // Like this we can identify to add the child
    const nodeName = array.length - 1 === index ? 'parent' : `n${index}`;
    restPath += `-[:HAS]->(${nodeName}: Topic { name: "${nodeNameAttribute}"})`;
  });
  return restPath;
};
