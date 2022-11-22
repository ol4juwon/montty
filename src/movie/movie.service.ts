import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { lastValueFrom, map } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movies } from './entities/movie.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movies) private movieRepository: Repository<Movies>,
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}
  async create(createMovieDto: CreateMovieDto) {
    try {
      const movie = await this.movieRepository.save(createMovieDto);
      console.log('rock ', movie);
      return { data: movie };
    } catch (err) {
      return { error: err.message };
    }
  }

  async findAll() {
    try {
      console.log('rue');
      const url = this.configService.get('TMDB_URL');
      const key = this.configService.get('TMDB_KEY');
      // const movies = await this.movieRepository.find();
      // const movies = await this.tmdb.getMovies('discover/movie');
      console.log(key, url);
      const response = this.httpService
        .get(`${url}/discover/movie?api_key=${key}`)
        .pipe(
          map((res) => {
            return res.data;
          }),
        )
        .pipe();

      const movies = await lastValueFrom(response);

      return { data: movies };
    } catch (error) {
      console.log(error);
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

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    try {
      const movie = await this.movieRepository.update(id, updateMovieDto);
      return { data: movie };
    } catch (error) {
      return { error };
    }
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }
}
