export const getTopicsQuery = (path: string) => {
  return `
    ${path}
    WITH parent
    MATCH (parent)-[:HAS]->(child:Topic)
    RETURN { 
      labels: labels(child), 
      name: child.name, 
      icon: child.icon, 
      description: child.description, 
      hash: child.hash 
    } as topic
    ORDER BY child.name
  `;
};
