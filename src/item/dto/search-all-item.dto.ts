import { ApiProperty } from '@nestjs/swagger';

export class SearchAllItemDto {
  @ApiProperty()
  name: string;
}
