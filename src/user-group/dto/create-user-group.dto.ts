import { ApiProperty } from '@nestjs/swagger';
import { RoleProjectGroup } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';

export class CreateUserGroupDto {
  @IsOptional()
  @ApiProperty({ default: null })
  id_user_parent: number;
  @ApiProperty()
  id_user: number;
  @ApiProperty()
  id_group: number;
  @IsEnum(RoleProjectGroup)
  @ApiProperty({ enum: RoleProjectGroup, default: 'USER' })
  role: RoleProjectGroup;
}
