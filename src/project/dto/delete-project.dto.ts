import { ApiProperty } from '@nestjs/swagger';

export class DeleteProjectDto {
  @ApiProperty()
  status: boolean;
}
