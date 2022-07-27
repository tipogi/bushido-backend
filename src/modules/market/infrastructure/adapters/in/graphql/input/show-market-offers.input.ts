import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class ShowMarketOffersInput {
  @Field()
  @IsString()
  fiat: string;

  @Field()
  @IsString()
  direction: string;

  @Field()
  @IsNumber()
  premium: number;
}
