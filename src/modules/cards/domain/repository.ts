import { Domain } from './domain';

export interface DomainNode {
  name: string;
  hash: string;
  visits: number | null;
}

export interface DomainRepository {
  findByPathAndName(path: string[], name: string): Promise<Domain | undefined>;
  updateVisits(domain: Domain): Promise<string>;
}
