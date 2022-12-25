import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class GetTaskDto {
  @ApiProperty()
  @Optional()
  private: boolean;

  @ApiProperty()
  @Optional()
  idUser: number;
}
