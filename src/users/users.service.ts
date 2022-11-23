import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.userRepository.save(createUserDto);
      return { data: user };
    } catch (error) {
      return { error: error.details };
    }
  }

  async findAll() {
    try {
      const user = await this.userRepository.find({
        relations: {
          Fave: true,
        },
      });
      if (user) return { data: user };

      return { error: 'no user found' };
    } catch (error) {
      return { error: error.details };
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: id },
        relations: {
          Fave: true,
          movies: true,
        },
      });
      if (user) return { data: user };

      return { error: 'no user found' };
    } catch (error) {
      return { error: error.details };
    }
  }
}
