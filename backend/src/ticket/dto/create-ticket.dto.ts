import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTicketDto {
  @ApiProperty({ example: 'Ticket X' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Av Horto Bela Vista' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ example: ['PENDING', 'IN PROGRESS', 'COMPLETE'] })
  @IsString()
  @IsNotEmpty()
  status: string;
}
