import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class QueryGetUser {
  @IsOptional()
  @ApiProperty()
  q: string;
}
