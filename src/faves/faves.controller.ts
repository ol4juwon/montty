import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FavesService } from './faves.service';
import { CreateFaveDto } from './dto/create-fave.dto';
import { UpdateFaveDto } from './dto/update-fave.dto';

@Controller('faves')
export class FavesController {
  constructor(private readonly favesService: FavesService) {}

  @Post()
  create(@Body() createFaveDto: CreateFaveDto) {
    return this.favesService.create(createFaveDto);
  }

  @Get()
  findAll() {
    return this.favesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.favesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFaveDto: UpdateFaveDto) {
    return this.favesService.update(+id, updateFaveDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.favesService.remove(+id);
  }
}
