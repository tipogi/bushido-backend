export const getDomain = (matchClause: string) => {
  return `
    MATCH ${matchClause}
    RETURN { 
      name: domain.name,
      hash: domain.hash,
      visits: domain.visits
    } as domain
  `;
};

export const UPDATE_VISITS = `
  MATCH (d:Domain {hash: $hash, name: $name})
  SET d.visits = $visits
  RETURN d as domain
`;
