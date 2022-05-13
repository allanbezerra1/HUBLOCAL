import { PartialType } from '@nestjs/swagger';
import { CreateAccountableDto } from './create-accountable.dto';

export class UpdateAccountableDto extends PartialType(CreateAccountableDto) {}
