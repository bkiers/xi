import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class SquareRead {
  @ApiProperty()
  @IsNumber()
  readonly columnIndex: number;

  @ApiProperty()
  @IsNumber()
  readonly rowIndex: number;

  constructor(columnIndex: number, rowIndex: number) {
    this.columnIndex = columnIndex;
    this.rowIndex = rowIndex;
  }
}
