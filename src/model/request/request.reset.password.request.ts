import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RequestResetPasswordRequest {
  @ApiProperty()
  @IsString()
  email: string;
}
