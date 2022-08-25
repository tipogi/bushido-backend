import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsString } from 'class-validator';

@InputType()
export class DomainVisitInput {
  @Field(() => [String])
  @IsArray()
  path: string[];

  @Field(() => String)
  @IsString()
  hash: string;

  @Field(() => String)
  @IsString()
  name: string;
}
