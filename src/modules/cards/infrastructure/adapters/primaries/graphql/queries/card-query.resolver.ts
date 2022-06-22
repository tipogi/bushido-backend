import { Resolver, Query } from '@nestjs/graphql';
import { CardObject } from '../models';
import { TempService } from './temp.service';

@Resolver((of) => CardObject)
export class CardQueryResolver {
  constructor(private readonly tempService: TempService) {}

  @Query((returns) => [CardObject])
  async showCard(): Promise<CardObject[]> {
    return await this.tempService.getCards();
  }
}
