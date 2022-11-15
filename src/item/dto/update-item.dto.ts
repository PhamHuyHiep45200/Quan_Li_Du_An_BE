import { ApiProperty } from '@nestjs/swagger';

export class UpdateItemDto {
  @ApiProperty()
  name: string;
}
