import { ApiProperty } from '@nestjs/swagger';

export class UpdateDeleteGroupDto {
  @ApiProperty()
  status: boolean;
}
