import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ShowTopicsQuery } from './show-topics.query';

@QueryHandler(ShowTopicsQuery)
export class ShowTopicsHandler implements IQueryHandler<ShowTopicsQuery> {
  //constructor() {}

  async execute(query: ShowTopicsQuery): Promise<any> {
    console.log(query);
    return [
      {
        name: 'hi',
        description: 'boom',
        icon: 'has',
        hash: 'asdfasdf',
      },
    ];
  }
}
