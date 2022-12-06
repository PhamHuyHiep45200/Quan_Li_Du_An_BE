import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty()
  id_user: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  startDate: Date;
  @ApiProperty()
  enđate: Date;
}
