import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Location } from './entities/location.entity';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private readonly repository: Repository<Location>,
  ) {}

  create(createLocationDto: CreateLocationDto): Promise<Location> {
    const location = this.repository.create(createLocationDto);
    return this.repository.save(location);
  }

  findAll(): Promise<Location[]> {
    return this.repository.find({ relations: ['company'] });
  }

  findOne(id: string): Promise<Location> {
    return this.repository.findOne({
      where: { id: id },
      relations: ['company'],
    });
  }

  async update(
    id: string,
    updateLocationDto: UpdateLocationDto,
  ): Promise<Location> {
    const location = await this.repository.preload({
      id: id,
      ...updateLocationDto,
    });
    if (!location) {
      throw new NotFoundException(`Location ${id} not found`);
    }
    return this.repository.save(location);
  }

  async remove(id: string) {
    const location = await this.findOne(id);
    return this.repository.remove(location);
  }
}
