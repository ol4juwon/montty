import { Module } from '@nestjs/common';
import { FavesService } from './faves.service';
import { FavesController } from './faves.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fave } from './entities/fave.entity';

@Module({
  controllers: [FavesController],
  providers: [FavesService],
  imports: [TypeOrmModule.forFeature([Fave])],
})
export class FavesModule {}
