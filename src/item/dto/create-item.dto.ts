import { ApiProperty } from '@nestjs/swagger';

export class CreateItemDto {
  @ApiProperty()
  id_group: number;
  @ApiProperty()
  id_user: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}
