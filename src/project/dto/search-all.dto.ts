import { ApiProperty } from '@nestjs/swagger';

export class SearchAllDto {
  @ApiProperty()
  name: string;
}
