import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import mockedConfigService from '../mocks/config.service';
import { ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { FavesService } from './faves.service';
import { Fave } from './entities/fave.entity';
describe('Faves service test', () => {
  let favesService: FavesService;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        FavesService,
        HttpModule,
        {
          provide: ConfigService,
          useValue: mockedConfigService,
        },
        {
          provide: getRepositoryToken(Fave),
          useValue: {
            new: jest.fn(),
            save: jest.fn(),
            findOneBy: jest.fn(),
            delete: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();
    favesService = await module.get(FavesService);
  });

  describe('', () => {
    it('attempt to create Fave with empty value', async () => {
      expect.assertions(2);
      const faveSpy = jest.spyOn(favesService, 'create');
      await favesService.create({
        user_id: 1,
        movie_id: 0,
        rank: 1,
      });

      expect(favesService.create).toBeCalled();
      expect(faveSpy).toBeCalled();
    });
  });
});
