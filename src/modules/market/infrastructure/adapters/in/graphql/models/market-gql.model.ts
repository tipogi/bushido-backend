import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
class PaymentMethods {
  @Field(() => [String])
  icons: string[];

  @Field(() => [String])
  others: string[];
}

@ObjectType()
class Offer {
  @Field()
  exchange: string;

  @Field()
  price: string;

  @Field()
  dif: string;

  @Field()
  maker_status: string;

  @Field()
  min_btc: string;

  @Field()
  max_btc: string;

  @Field()
  min_amount: string;

  @Field()
  max_amount: string;

  @Field(() => PaymentMethods)
  method: PaymentMethods;

  // Should be optional, not mandatory property. TODO, graphQL contract
  @Field()
  extra: string;
}

@ObjectType()
export class MarketObject {
  @Field(() => [Offer])
  offers: Offer[];

  @Field({ nullable: false })
  price: string;
}
