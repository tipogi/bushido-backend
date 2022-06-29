export class Topic {
  name: string;
  description: string;
  icon: string;
  hash: string;
}

export interface TopicRepository {
  findTopicByPath: (path: string[]) => Promise<Topic[] | undefined>;
}
