import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company) private readonly repository: Repository<Company>,
  ) {}

  create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const company = this.repository.create(createCompanyDto);
    return this.repository.save(company);
  }

  findAll(): Promise<Company[]> {
    return this.repository.find({ relations: ['accountable'] });
  }

  findOne(id: string): Promise<Company> {
    return this.repository.findOne({
      where: { id: id },
      relations: ['accountable'],
    });
  }

  async update(
    id: string,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    const company = await this.repository.preload({
      id: id,
      ...updateCompanyDto,
    });
    if (!company) {
      throw new NotFoundException(`Company ${id} not found`);
    }
    return this.repository.save(company);
  }

  async remove(id: string) {
    const company = await this.findOne(id);
    return this.repository.remove(company);
  }
}
