import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateIfnoUserDto {
  @ApiProperty()
  @IsOptional()
  firstName: string;
  @IsOptional()
  @ApiProperty()
  lastName: string;
  @IsOptional()
  @ApiProperty()
  phone: string;
  @IsOptional()
  @ApiProperty()
  thumbnail: string;
}
