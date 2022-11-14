import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class SearchUserGroup {
  @IsOptional()
  @ApiProperty()
  q: string;
}
