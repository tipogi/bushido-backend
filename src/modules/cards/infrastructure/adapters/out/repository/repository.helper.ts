import { slice, head, last, forEach } from 'lodash';
import { BRANCH, DOMAIN, HAS_REL, LEAF, ROOT } from '../constants';

/**
 * Create MATCH clause to find a domain in the graph
 * @param pathArray Nodes name to reach the domain
 * @param domainName domain name
 * @returns string
 * EXAMPLE: (parent: Root {name: "Bushido"})-[:HAS]->(b0: Branch { name: "Guide"})-[:HAS]->(leaf: Leaf {name: "Bonsai"})-[:HAS]->(domain: Domain {name: "tipogi"})
 */
export const createMatchClause = (pathArray: string[], domainName: string): string => {
  const rootNode = `(parent: ${ROOT} {name: "${head(pathArray)}"})${HAS_REL}`;
  const leafNode = `(leaf: ${LEAF} {name: "${last(pathArray)}"})${HAS_REL}`;
  const pathWithoutRootAndLeaf = slice(pathArray, 1, pathArray.length - 1);
  let branchRelationships = '';
  forEach(pathWithoutRootAndLeaf, (topicNode, index) => {
    branchRelationships += `(b${index}: ${BRANCH} { name: "${topicNode}"})${HAS_REL}`;
  });
  const domainNode = `(domain: ${DOMAIN} {name: "${domainName}"})`;
  return rootNode + branchRelationships + leafNode + domainNode;
};
