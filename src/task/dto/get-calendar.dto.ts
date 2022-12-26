import { ApiProperty } from '@nestjs/swagger';

export class GetCalendarDto {
  @ApiProperty({ default: new Date() })
  start_date: Date;

  @ApiProperty({ default: new Date() })
  end_date: Date;

  @ApiProperty()
  id_user: number;

  @ApiProperty()
  id_item: number;
}
