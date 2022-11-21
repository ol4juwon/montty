import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movies } from './entities/movie.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movies) private movieRepository: Repository<Movies>,
  ) {}
  async create(createMovieDto: CreateMovieDto) {
    try {
      const movie = await this.movieRepository.save(createMovieDto);
      return { data: movie };
    } catch (err) {
      return { error: err.message };
    }
  }

  async findAll() {
    try {
      const movies = await this.movieRepository.find();
      return { data: movies };
    } catch (error) {
      return { error };
    }
  }

  async findOne(id: number) {
    try {
      const movie = await this.movieRepository.findOneBy({ id: id });
      return { data: movie };
    } catch (error) {
      return { error };
    }
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return `This action updates a #${id} movie`;
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }
}
