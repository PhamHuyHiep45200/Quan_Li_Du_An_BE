import { ApiProperty } from '@nestjs/swagger';

export class CreateDocs {
  @ApiProperty()
  name: string;
  data: string;
  projectId?: number;
  groupId?: number;
}
