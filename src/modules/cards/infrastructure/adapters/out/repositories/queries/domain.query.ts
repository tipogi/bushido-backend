export const getDomainsQuery = (path: string) => {
  return `
    ${path}
    WITH parent
    MATCH (parent)-[:HAS]->(child:Domain)
    RETURN { 
      labels: labels(child),
      name: child.name,
      description: child.description,
      icon: child.icon, 
      hash: child.hash,
      lang: child.lang,
      tag: child.tag,
      url: child.url
    } as domain
    ORDER BY child.name
  `;
};
