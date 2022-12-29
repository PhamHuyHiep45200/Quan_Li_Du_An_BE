import { ApiProperty } from '@nestjs/swagger';

export class GetWorkMe {
  @ApiProperty()
  id_user: number;
}
