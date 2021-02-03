import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DrawProposalRequest {
  @ApiProperty()
  @IsString()
  accepted: string;
}
