import { ApiProperty } from '@nestjs/swagger';
import { StatusVerify } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class UpdateUserProjectDto {
  @IsEnum(StatusVerify)
  @ApiProperty({ enum: StatusVerify })
  status: StatusVerify;
  @ApiProperty()
  id_user: number;
}
