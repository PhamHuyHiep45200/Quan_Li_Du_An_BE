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
  @IsOptional()
  id_taskParent: number;

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

  @ApiProperty()
  @IsOptional()
  level: string;
}
