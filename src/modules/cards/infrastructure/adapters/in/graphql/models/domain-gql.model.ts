import { Field, ObjectType } from '@nestjs/graphql';
import { IsArray } from 'class-validator';

@ObjectType()
export class DomainObject {
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
  tag: string[];

  @Field({ nullable: true })
  lang: string;

  @Field({ nullable: false })
  url: string;

  @Field(() => [String])
  @IsArray()
  labels: string[];
}
