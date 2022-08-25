export class Topic {
  name: string;
  description: string;
  icon: string;
  hash: string;
  labels?: string[];
  type: string;
}

export interface TopicQuery {
  findTopicByPath: (path: string[]) => Promise<Topic[]>;
  findRootTopics: () => Promise<Topic[]>;
}
