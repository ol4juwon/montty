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
  async create(createFaveDto: CreateFaveDto) {
    if (createFaveDto.rank > 100 || createFaveDto.rank < 1)
      return { error: 'invalid rank provided, rank must be between 1-100.' };
    const favexists = await this.faveRepository.findOneBy({
      user_id: createFaveDto.user_id,
      movie_id: createFaveDto.movie_id,
    });
    if (favexists) {
      console.log('Face', favexists);
      return { error: 'You already have a movie at that rank' };
    }
    const faves = await this.faveRepository.save(createFaveDto);
    return { data: faves };
  }

  async findAll() {
    try {
      const allFaves = await this.faveRepository.find();
      return { data: allFaves };
    } catch (error) {
      return { error };
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} fave`;
  }

  update(id: number, updateFaveDto: UpdateFaveDto) {
    return this.faveRepository.update(id, { movie_id: updateFaveDto.movie_id });
  }

  async remove(id: number) {
    return await this.faveRepository.delete({ id: id });
  }
}
