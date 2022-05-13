import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AccountableService } from './accountable.service';
import { CreateAccountableDto } from './dto/create-accountable.dto';
import { UpdateAccountableDto } from './dto/update-accountable.dto';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';

@Controller('accountable')
export class AccountableController {
  constructor(private readonly accountableService: AccountableService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createAccountableDto: CreateAccountableDto) {
    return this.accountableService.create(createAccountableDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.accountableService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.accountableService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateAccountableDto: UpdateAccountableDto,
  ) {
    return this.accountableService.update(id, updateAccountableDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.accountableService.remove(id);
  }
}
