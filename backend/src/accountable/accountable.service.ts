import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountableDto } from './dto/create-accountable.dto';
import { UpdateAccountableDto } from './dto/update-accountable.dto';
import { Accountable } from './entities/accountable.entity';

@Injectable()
export class AccountableService {
  constructor(
    @InjectRepository(Accountable)
    private readonly repository: Repository<Accountable>,
  ) {}

  async create(
    createAccountableDto: CreateAccountableDto,
  ): Promise<Accountable> {
    const accountable = await this.repository.create(createAccountableDto);
    return this.repository.save(accountable);
  }

  async findAll(): Promise<Accountable[]> {
    return await this.repository.find({ relations: ['location'] });
  }

  async findOne(id: string): Promise<Accountable> {
    const accountable = await this.repository.findOne({
      where: { id: id },
      relations: ['location'],
    });
    if (!accountable) {
      throw new NotFoundException(`Accountable ${id} not found`);
    }
    return accountable;
  }

  async update(
    id: string,
    updateAccountableDto: UpdateAccountableDto,
  ): Promise<Accountable> {
    const accountable = await this.repository.preload({
      id: id,
      ...updateAccountableDto,
    });
    if (!accountable) {
      throw new NotFoundException(`Accountable ${id} not found`);
    }
    return this.repository.save(accountable);
  }

  async remove(id: string) {
    const accountable = await this.findOne(id);
    return this.repository.remove(accountable);
  }
}
