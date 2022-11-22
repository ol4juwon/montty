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
      console.log(createMovieDto);
      const { error, data } = await this.movieService.create(createMovieDto);
      console.log('loki');
      if (error) {
        console.log(error);
        res.status(400).send({
          error,
          status: 404,
          message: 'Movie Creation failed',
          success: false,
        });
      }
      res.status(201).send({
        data,
        status: 201,
        message: 'Movie successfully created',
        success: true,
      });
    } catch (error) {
      res.status(500).send({
        error,
        status: 500,
        message: 'Something went wrong',
      });
    }
  }

  @Get()
  async findAll() {
    try {
      const { error, data } = await this.movieService.findAll();
      if (error) {
        return {
          error,
          status: 401,
          message: 'Error getting list of movies',
        };
      } else {
        return {
          data,
          status: 200,
          message: 'Movie request successful',
        };
      }
    } catch (err) {
      return {
        error: err,
        status: 500,
      };
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
  async update(
    @Response() res,
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    try {
      const { error, data } = await this.movieService.update(
        +id,
        updateMovieDto,
      );
      if (data)
        res.status(200).send({
          data,
          message: 'Movie updated successfuly',
        });
      if (error)
        res.status(400).send({ error, message: 'Movie updated failed' });
    } catch (error) {
      res.status(500).send({});
    }
  }

  @Delete(':id')
  remove(@Response() res, @Param('id') id: string) {
    try {
      const { error, data } = this.movieService.remove(+id);
      if (error) res.status(400).send({ message: 'error deleting movie' });
      res.status(204).send({ data, message: 'Deleted' });
    } catch (error) {
      res.status(500).send({});
    }
  }
}
