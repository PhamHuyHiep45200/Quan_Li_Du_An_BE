import { ApiProperty } from '@nestjs/swagger';

export class ForgotpassWord {
  @ApiProperty()
  password: string;
}
