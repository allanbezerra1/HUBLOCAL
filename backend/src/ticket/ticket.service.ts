import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './entities/ticket.entity';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private readonly repository: Repository<Ticket>,
  ) {}

  create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const ticket = this.repository.create(createTicketDto);
    return this.repository.save(ticket);
  }

  findAll(): Promise<Ticket[]> {
    return this.repository.find({
      relations: ['location', 'accountable', 'clerk'],
    });
  }

  findOne(id: string): Promise<Ticket> {
    return this.repository.findOne({
      where: { id: id },
      relations: ['location', 'accountable', 'clerk'],
    });
  }

  async update(id: string, updateTicketDto: UpdateTicketDto): Promise<Ticket> {
    const ticket = await this.repository.preload({
      id: id,
      ...updateTicketDto,
    });
    if (!ticket) {
      throw new NotFoundException(`Ticket ${id} not found`);
    }
    return this.repository.save(ticket);
  }

  async remove(id: string) {
    const ticket = await this.findOne(id);
    return this.repository.remove(ticket);
  }
}
