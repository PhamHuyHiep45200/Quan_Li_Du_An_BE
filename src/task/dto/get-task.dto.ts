import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class GetTaskDto {
  @ApiProperty()
  @Optional()
  id_user: number;
}
