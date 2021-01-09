import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordRequest {
  @ApiProperty()
  @IsString()
  code: string;

  @ApiProperty()
  @IsString()
  password: string;
}
