import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLocationDto {
  @ApiProperty({ example: 'Salvador' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Av Horto Bela Vista' })
  @IsString()
  @IsNotEmpty()
  address: string;
}
