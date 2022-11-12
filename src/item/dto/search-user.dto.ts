import { ApiProperty } from '@nestjs/swagger';

export class SearchUser {
  @ApiProperty()
  q: string;
}
