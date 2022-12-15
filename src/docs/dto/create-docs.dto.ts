import { ApiProperty } from '@nestjs/swagger';

export class CreateDocs {
  @ApiProperty()
  data: string;
  projectId?: number;
  groupId?: number;
}
