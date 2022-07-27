import { Field, InputType } from '@nestjs/graphql';
import { IsArray } from 'class-validator';

@InputType()
export class ShowDomainsInput {
  @Field(() => [String])
  @IsArray()
  path: string[];
}
