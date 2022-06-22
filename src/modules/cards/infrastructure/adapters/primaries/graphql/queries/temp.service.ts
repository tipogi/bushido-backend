import { Injectable } from "@nestjs/common";
import { Neo4jService } from "src/utils/neo4j";
import { CardObject } from "../models";

@Injectable()
export class TempService {
  constructor(
    private readonly neo4jService: Neo4jService
  ) {}

  async getCards(): Promise<CardObject[]> {
    try {
      const { records } = await this.neo4jService.read(ROOT_QUERY);
      return records.map(topic => topic.get('topic'));
    } catch (e) {
      console.log('ERROR')
      console.log(e)
    }
  }
}

const ROOT_QUERY = `
  MATCH (n:Root:Topic) RETURN { url: n.url, name: n.name, description: n.description, icon: n.icon } as topic
`;