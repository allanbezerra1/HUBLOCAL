import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAccountableDto {
  @ApiProperty({ example: 'Accountable ABC' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 75991078460, description: 'Needed Phone' })
  @IsString()
  phone: string;

  @ApiPropertyOptional({
    example: 'xxxxx, number 123',
    description: 'Address of Accountable',
  })
  @IsString()
  address: string;
}
