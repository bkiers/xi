import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GameAcceptRequest {
  @ApiProperty()
  @IsString()
  readonly acceptanceCode: string;
}
