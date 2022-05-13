import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.repository.create(createUserDto);
    return this.repository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.repository.find();
  }

  async findOne(id: string): Promise<User> {
    return await this.repository.findOne({
      where: { id: id },
    });
  }

  async findByUsername(username: string): Promise<User> {
    return await this.repository.findOne({
      where: { username: username },
    });
  }

  async findByAnotherUsername(username: string): Promise<User> {
    const userFound = await this.repository.findOne({
      where: { username: username },
    });
    console.log(userFound);
    return userFound;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.repository.preload({
      id: id,
      ...updateUserDto,
    });
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return this.repository.save(user);
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    return this.repository.remove(user);
  }
}
