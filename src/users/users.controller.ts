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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Response() res, @Body() createUserDto: CreateUserDto) {
    try {
      const { error, data } = await this.usersService.create(createUserDto);
      if (error) {
        res.status(400).send({ error, message: 'failed' });
      } else {
        res.status(201).send({ data, message: 'user created successfully' });
      }
    } catch (error) {
      res.status(500).send({ message: 'failed' });
    }
  }
  @Get('')
  async findAll(@Response() res) {
    try {
      const { error, data } = await this.usersService.findAll();
      if (error) {
        res.status(400).send({ error });
      } else {
        res.status(200).send({ data });
      }
    } catch (err) {
      res.status(500).send({ error: err.details });
    }
  }
  @Get(':id')
  async findOne(@Response() res, @Param('id') id: string) {
    try {
      const { error, data } = await this.usersService.findOne(+id);
      if (error) {
        res.status(400).send({ error });
      } else {
        res.status(200).send({ data });
      }
    } catch (err) {
      res.status(500).send({ error: err.details });
    }
  }
}
