import { Test, TestingModule } from '@nestjs/testing';
import { FavesService } from './faves.service';

describe('FavesService', () => {
  let service: FavesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FavesService],
    }).compile();

    service = module.get<FavesService>(FavesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
