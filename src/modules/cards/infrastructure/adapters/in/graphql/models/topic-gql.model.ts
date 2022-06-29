import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TopicObject {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  icon: string;

  @Field({ nullable: false })
  hash: string;
}
