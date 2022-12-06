import { ApiProperty } from '@nestjs/swagger';
import { StatusTask } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ default: null })
  @IsOptional()
  id_item: number;

  @ApiProperty()
  id_user: number;

  @IsOptional()
  @ApiProperty()
  thumbnail: string[];

  @IsEnum(StatusTask)
  @ApiProperty({ enum: StatusTask, default: 'OPEN' })
  status: StatusTask;

  @ApiProperty({ default: null })
  @IsOptional()
  taskParentId: number;

  @ApiProperty()
  descriptions: string;

  @ApiProperty()
  @IsOptional()
  userManager: number;

  @ApiProperty()
  @IsOptional()
  start_Time: string;

  @ApiProperty()
  @IsOptional()
  end_Time: string;
}
