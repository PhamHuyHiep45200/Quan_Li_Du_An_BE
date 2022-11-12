import { ApiProperty } from '@nestjs/swagger';
import { RoleProjectGroup, StatusVerify } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';

export class CreateUserProjectDto {
  @IsOptional()
  @ApiProperty({ default: null })
  id_user_parent: number;
  @ApiProperty()
  id_user: number;
  @ApiProperty()
  id_project: number;
  @IsEnum(StatusVerify)
  @ApiProperty({ enum: StatusVerify, default: 'PENDDING' })
  status: StatusVerify;
  @IsEnum(RoleProjectGroup)
  @ApiProperty({ enum: RoleProjectGroup, default: 'USER' })
  role: RoleProjectGroup;
}
