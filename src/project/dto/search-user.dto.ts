import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class QuerySearchUser {
  @IsOptional()
  @ApiProperty()
  q: string;
}
