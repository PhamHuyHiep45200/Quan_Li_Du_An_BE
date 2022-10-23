import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty()
  id_item: number;
  @ApiProperty()
  id_user: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  descriptions: string;

  @ApiProperty()
  userManager: number;

  @ApiProperty()
  start_Time: string;

  @ApiProperty()
  end_Time: string;

  @ApiProperty()
  planned_Time: string;

  @ApiProperty()
  createdAt: string;
  @ApiProperty()
  updatedAt: string;

  @ApiProperty()
  level: string;
}
