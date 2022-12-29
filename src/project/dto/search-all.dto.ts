import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class SearchAllDto {
  @Optional()
  @ApiProperty()
  name: string;
}
