import { ApiProperty } from '@nestjs/swagger';

export class UpdateDocs {
  @ApiProperty()
  data: string;
}
