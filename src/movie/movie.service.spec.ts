import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Movies } from './entities/movie.entity';
import { MovieService } from './movie.service';
import mockedConfigService from '../mocks/config.service';
import { ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
describe('Movie service test', () => {
  let movieService: MovieService;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        MovieService,
        HttpModule,
        {
          provide: ConfigService,
          useValue: mockedConfigService,
        },
        {
          provide: getRepositoryToken(Movies),
          useValue: {},
        },
      ],
    }).compile();
    movieService = await module.get(MovieService);
  });

  describe('', () => {
    it('attempt to create movies with empty value', async () => {
      expect.assertions(2);
      const moviespy = jest.spyOn(movieService, 'create');
      await movieService.create({});

      expect(movieService.create).toBeCalled();
      expect(moviespy).toBeCalled();
    });
  });

});
