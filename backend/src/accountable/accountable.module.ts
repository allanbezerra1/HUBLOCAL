import { Module } from '@nestjs/common';
import { AccountableService } from './accountable.service';
import { AccountableController } from './accountable.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accountable } from './entities/accountable.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Accountable])],
  controllers: [AccountableController],
  providers: [AccountableService],
})
export class AccountableModule {}
