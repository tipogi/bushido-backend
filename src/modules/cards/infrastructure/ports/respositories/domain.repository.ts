export class Domain {
  name: string;
  description: string;
  hash: string;
  icon: string;
  lang: string;
  url: string;
  tag: string[];
}

export interface DomainRepository {
  findDomainsByPath: (path: string[]) => Promise<Domain[]>;
}
