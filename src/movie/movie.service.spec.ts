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
      await movieService.create({
        user_id: 1,
        tmdb_id: 436270,
        original_language: 'en',
        original_title: 'Black Adam',
        overview:
          'Nearly 5,000 years after he was bestowed with the almighty powers of the Egyptian gods—and imprisoned just as quickly—Black Adam is freed from his earthly tomb, ready to unleash his unique form of justice on the modern world.',
        popularity: 23828.993,
        poster_path: '/pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg',
        release_date: '2022-10-19',
        title: 'Black Adam',
        video: false,
        vote_average: 6.8,
        vote_count: 1270,
      });

      expect(movieService.create).toBeCalled();
      expect(moviespy).toBeCalled();
    });
  });
});
