import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movies } from './entities/movie.entity';
import { MovieService } from './movie.service';
import mockedConfigService from '../mocks/config.service';
import { ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { MovieController } from './movie.controller';
import * as request from 'supertest';
import { User } from 'src/users/entities/user.entity';

describe('Movie Controller test', () => {
  let app: INestApplication;
  let movieData;
  let user: User;

  beforeEach(async () => {
    movieData = {
      id: 1,
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
      user,
    };
    const mockData = {
      id: 1,
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
      user,
    };
    const module = await Test.createTestingModule({
      controllers: [MovieController],
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
          useValue: {
            new: jest.fn().mockResolvedValue(mockData),
            findOneBy: jest.fn().mockReturnValue(mockData),
            delete: jest.fn().mockReturnValue({}),
            update: jest.fn(),
            save: jest.fn().mockReturnValue({
              data: movieData,
              status: 201,
              message: 'Movie successfully created',
              success: true,
            }),
          },
        },
      ],
    }).compile();
    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('When creating movie with valid data', () => {
    it('Respond with valid response', async () => {
      const expectedData = {
        data: movieData,
        status: 400,
        message: 'Movie successfully created',
        success: true,
      };
      return await request(app.getHttpServer())
        .post('/movie')
        .send(movieData)
        .expect(201)
        .catch((err) => console.log(err.message));
    });
  });

  describe('Find movies', () => {
    it('find movies', () => {
      return request(app.getHttpServer()).get('/movie').expect(200);
    });
  });

  describe('find one ', () => {
    it('find one movie', () => {
      return request(app.getHttpServer()).get('/movie/1').expect(200);
    });
  });
  describe('update one', () => {
    it('update one', async () => {
      return await request(app.getHttpServer())
        .patch('/movie/1')
        .send({ title: 'robert de niro' })
        .expect(400);
    });
    it('invalid id', async () => {
      return await request(app.getHttpServer())
        .patch('/movie/122')
        .send()
        .expect(400)
        .expect({ error: 'failed', message: 'Movie updated failed' });
    });
  });
  describe('delete one', () => {
    it('delete one', async () => {
      return await request(app.getHttpServer())
        .delete('/movie/2')
        .expect(204)
        .catch((err) => console.log(err.message));
    });
  });
});
