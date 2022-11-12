import { ApiProperty } from '@nestjs/swagger';
import { StatusVerify } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class UpdateUserGrouptDto {
  @IsEnum(StatusVerify)
  @ApiProperty({ enum: StatusVerify })
  status: StatusVerify;
}
