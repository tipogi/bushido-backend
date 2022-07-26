import { Field, ObjectType } from '@nestjs/graphql';
import { IsArray } from 'class-validator';

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

  @Field(() => [String])
  @IsArray()
  labels: string[];
}
