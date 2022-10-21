import { Domain } from './domain';

export interface DomainNode {
  name: string;
  hash: string;
  views: number | null;
}

export interface DomainRepository {
  findByPathAndName(path: string[], name: string): Promise<Domain | undefined>;
  updateViews(domain: Domain): Promise<string>;
}
