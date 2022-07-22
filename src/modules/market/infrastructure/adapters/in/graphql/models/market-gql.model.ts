import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
class Offer {
  @Field()
  exchange: string;

  @Field()
  price: string;

  @Field()
  dif: string;

  @Field()
  min_btc: string;

  @Field()
  max_btc: string;

  @Field()
  min_amount: string;

  @Field()
  max_amount: string;

  @Field()
  method: string;
}

@ObjectType()
export class MarketObject {
  @Field(() => [Offer])
  offers: Offer[];

  @Field({ nullable: false })
  price: string;
}
