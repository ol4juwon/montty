import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFaveDto } from './dto/create-fave.dto';
import { UpdateFaveDto } from './dto/update-fave.dto';
import { Fave } from './entities/fave.entity';

@Injectable()
export class FavesService {
  constructor(
    @InjectRepository(Fave) private faveRepository: Repository<Fave>,
  ) {}
  create(createFaveDto: CreateFaveDto) {
    return this.faveRepository.save(createFaveDto);
  }

  findAll() {
    return `This action returns all faves`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fave`;
  }

  update(id: number, updateFaveDto: UpdateFaveDto) {
    return `This action updates a #${id} fave`;
  }

  remove(id: number) {
    return `This action removes a #${id} fave`;
  }
}
