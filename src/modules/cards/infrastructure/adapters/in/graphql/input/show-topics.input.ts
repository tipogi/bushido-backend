import { Field, InputType } from '@nestjs/graphql';
import { IsArray } from 'class-validator';

@InputType()
export class ShowTopicsInput {
  @Field(() => [String])
  @IsArray()
  path: string[];
}
