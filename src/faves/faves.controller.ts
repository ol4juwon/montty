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
import { FavesService } from './faves.service';
import { CreateFaveDto } from './dto/create-fave.dto';
import { UpdateFaveDto } from './dto/update-fave.dto';

@Controller('faves')
export class FavesController {
  constructor(private readonly favesService: FavesService) {}

  @Post()
  async create(@Response() res, @Body() createFaveDto: CreateFaveDto) {
    try {
      const { error, data } = await this.favesService.create(createFaveDto);
      if (error) {
        res.status(400).send({ error, message: 'Adding Fave failed' });
      } else {
        res.status(201).send({ data, message: 'Favorite added successfully' });
      }
    } catch (error) {
      res.status(500).send({ message: 'contact support' });
    }
  }

  @Get()
  async findAll(@Response() res) {
    try {
      const { error, data } = await this.favesService.findAll();

      if (error) {
        res.status(404).send({ error, message: 'failed' });
      } else {
        res.status(200).send({ data, message: 'done' });
      }
    } catch (error) {
      return res.status(500).send({ message: 'server error' });
    }
  }

  @Get(':id')
  async findOne(@Response() res, @Param('id') id: string) {
    try {
      const { error, data } = await this.favesService.findOne(+id);
      if (error) {
        res.status(404).send({ error });
      } else {
        res.status(200).send({ data });
      }
    } catch (error) {
      return res.status(500).send({ error });
    }
  }

  @Patch(':id')
  async update(
    @Response() res,
    @Param('id') id: string,
    @Body() updateFaveDto: UpdateFaveDto,
  ) {
    try {
      const { error, data } = await this.favesService.update(
        +id,
        updateFaveDto,
      );
      if (error) {
        res.status(404).send({});
      } else {
        res.status(200).send({ data });
      }
    } catch (error) {
      return res.status(500).send({});
    }
  }

  @Delete(':user_id/:id')
  async remove(@Response() res, @Param('id') id: string) {
    try {
      const { error, data } = await this.favesService.remove(+id);
      if (error) {
        res.status(404).send({});
      } else {
        res.status(200).send({ data });
      }
    } catch (error) {
      return res.status(500).send({});
    }
  }
}
