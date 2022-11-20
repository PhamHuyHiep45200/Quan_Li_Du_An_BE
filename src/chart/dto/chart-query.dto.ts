import { ApiProperty } from '@nestjs/swagger';

export class ChartQueryDto {
  @ApiProperty()
  id_user: number;
}
