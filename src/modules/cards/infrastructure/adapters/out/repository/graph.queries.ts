export const getDomain = (matchClause: string) => {
  return `
    MATCH ${matchClause}
    RETURN { 
      name: domain.name,
      hash: domain.hash,
      views: domain.views
    } as domain
  `;
};

export const UPDATE_VIEWS = `
  MATCH (d:Domain {hash: $hash, name: $name})
  SET d.views = $views
  RETURN d as domain
`;
