import { ApiProperty } from '@nestjs/swagger';
import { RoleType } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class CreateUserDto {
  firstName: string;
  lastName: string;
  birthday: Date;
  email: string;
  password: string;
  thumbnail: string;
  phone: string;
  gender: string;
  @IsEnum(RoleType)
  @ApiProperty({ enum: RoleType, default: 'USER' })
  role: RoleType;
  @ApiProperty({ default: false })
  deleteFlg: boolean;
  createdAt: Date;
  updatedAt: Date;
}
