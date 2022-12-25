import { ApiProperty } from '@nestjs/swagger';

export class UpdateDeleteItemDto {
  @ApiProperty()
  status: boolean;
}
