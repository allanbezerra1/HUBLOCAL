import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCompanyDto {
  @ApiProperty({ example: 'Company ABC' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '10317002000162' })
  @IsString()
  cnpj: string;

  @ApiPropertyOptional({
    example: 'Tech Company',
    description: 'Optional description of the company',
  })
  @IsOptional()
  @IsString()
  description: string;
}
