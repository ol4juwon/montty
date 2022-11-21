import { Test, TestingModule } from '@nestjs/testing';
import { FavesController } from './faves.controller';
import { FavesService } from './faves.service';

describe('FavesController', () => {
  let controller: FavesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavesController],
      providers: [FavesService],
    }).compile();

    controller = module.get<FavesController>(FavesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
