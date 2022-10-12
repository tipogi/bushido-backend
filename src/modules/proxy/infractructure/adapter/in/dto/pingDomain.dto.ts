import { IsNotEmpty, IsString } from 'class-validator';

export class PingDomainDTO {
  @IsNotEmpty()
  @IsString()
  domain: string;
}
