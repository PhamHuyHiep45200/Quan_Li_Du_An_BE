import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ default: null })
  @IsOptional()
  id_item: number;

  @ApiProperty()
  id_user: number;

  @ApiProperty({ default: null })
  @IsOptional()
  taskParent: number;

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
