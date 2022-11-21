import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Response,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  async create(@Response() res, @Body() createMovieDto: CreateMovieDto) {
    try {
      const { error, data } = await this.movieService.create(createMovieDto);
      if (error) {
        return res.status(401).send({
          error,
          message: 'Movie Creation failed',
          success: false,
        });
      }
      res.status(201).send({
        data,
        message: 'Movie successfully created',
        success: true,
      });
    } catch (error) {
      res.status(400).send({
        error,
        message: 'Something went wrong',
      });
    }
  }

  @Get()
  async findAll(@Response() res) {
    try {
      const { error, data } = await this.movieService.findAll();
      if (error) {
        res.status(400).send({
          error,
          message: 'Error getting list of movies',
        });
      } else {
        res.status(200).send({
          data,
          message: 'Movie request successful',
        });
      }
    } catch (err) {
      res.status(500).send({
        error: err,
      });
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      console.log('===>');
      return await this.movieService.findOne(+id);
    } catch (err) {
      console.log('--->', err.details);
      return err.details;
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.movieService.update(+id, updateMovieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movieService.remove(+id);
  }
}
