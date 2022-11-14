import { ApiProperty } from '@nestjs/swagger';
import { StatusTask } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class UpdateTaskDto {
  @IsEnum(StatusTask)
  @ApiProperty({ enum: StatusTask, default: 'OPEN' })
  status: StatusTask;
}
