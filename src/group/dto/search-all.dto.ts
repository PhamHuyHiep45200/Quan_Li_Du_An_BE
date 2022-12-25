import { ApiProperty } from '@nestjs/swagger';

export class SearchAllGroupDto {
  @ApiProperty()
  name: string;
}
