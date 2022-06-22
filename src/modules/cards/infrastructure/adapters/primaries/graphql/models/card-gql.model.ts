import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CardObject {

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  url: string;

  @Field({ nullable: true })
  icon?: string;
}