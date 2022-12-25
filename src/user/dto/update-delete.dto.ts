import { ApiProperty } from '@nestjs/swagger';

export class UpdateDeleteUserDto {
  @ApiProperty()
  status: boolean;
}
