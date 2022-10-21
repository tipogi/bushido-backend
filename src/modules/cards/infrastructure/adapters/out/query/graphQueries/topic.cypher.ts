export const getTopicsQuery = (path: string) => {
  return `
    ${path}
    WITH parent
    MATCH (parent)-[:HAS]->(child:Topic)
    RETURN { 
      name: child.name, 
      description: child.description, 
      icon: child.icon, 
      hash: child.hash,
      labels: labels(child)
    } as topic
    ORDER BY child.name
  `;
};

export const ROOT_TOPICS = `
  MATCH (root: Topic:Root) 
  WHERE root.access = "public"
  RETURN { 
    name: root.name, 
    description: root.description, 
    icon: root.icon, 
    hash: root.hash ,
    type: 'Root'
  } as topic
  ORDER BY root.name
`;
