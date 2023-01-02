import { ApiProperty } from '@nestjs/swagger';
import { StatusTask } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdateTaskDto {
  @IsEnum(StatusTask)
  @IsOptional()
  @ApiProperty({ enum: StatusTask, default: 'OPEN' })
  status: StatusTask;

  @IsOptional()
  @ApiProperty()
  descriptions: string;

  @IsOptional()
  @ApiProperty()
  thumbnail: string[];

  @IsOptional()
  @ApiProperty()
  start_Time: string;

  @IsOptional()
  @ApiProperty()
  end_Time: string;

  @IsOptional()
  @ApiProperty()
  userManager: number;

  @ApiProperty()
  idUserChange: number;
}
