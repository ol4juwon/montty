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
    try {
      const faves = await this.faveRepository.save(createFaveDto);
      return { data: faves };
    } catch (error) {
      console.log(error);
      return { error: error.message };
    }
  }

  async findAll() {
    try {
      const allFaves = await this.faveRepository.find();
      // console.log("Faves", allFaves);
      if (allFaves) return { data: allFaves };
      return { error: 'failed' };
    } catch (error) {
      // console.log(error);
      return { error };
    }
  }

  async findOne(id: number) {
    try {
      const fave = await this.faveRepository.findOneBy({ id });
      // console.log('user fave', fave);
      if (fave) return { data: fave };
      return { error: 'failed' };
    } catch (error) {
      return { error };
    }
  }

  async update(id: number, updateFaveDto: UpdateFaveDto) {
    try {
      const updated = await this.faveRepository.update(id, {
        movie_id: updateFaveDto.movie_id,
      });
      // console.log(updated);
      if (updated?.affected > 0) return { data: 'success' };
      return { error: 'failed' };
    } catch (error) {
      return { error: error.details };
    }
  }

  async remove(id: number) {
    try {
      const del = await this.faveRepository.delete({ id: id });
      if (del.affected == 0) return { data: 'done' };
      return { error: 'failed' };
    } catch (error) {
      return { error: error.details };
    }
  }
}
