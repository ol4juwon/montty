import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import mockedConfigService from '../mocks/config.service';
import { ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { FavesController } from './faves.controller';
import { FavesService } from './faves.service';
import { Fave } from './entities/fave.entity';

describe('Fave Controller test', () => {
  let app: INestApplication;
  let faveData;
  beforeEach(async () => {
    faveData = {
      id: 1,
      user_id: 1,
      movie_id: 1,
      rank: 1,
    };
    const module = await Test.createTestingModule({
      controllers: [FavesController],
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
            findOneBy: jest
              .fn()
              .mockReturnValue({ id: 1, user_id: 1, movie_id: 1, rank: 1 }),
            find: jest
              .fn()
              .mockReturnValue({ id: 1, user_id: 1, movie_id: 1, rank: 1 }),
            delete: jest.fn().mockReturnValue({}),
            update: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();
    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('Add to Fave', () => {
    it('InValid Request', async () => {
      return await request(app.getHttpServer())
        .post('/faves')
        .send({})
        .expect(400);
    });
  });
  describe('Get all ', () => {
    it('Valid Request', async () => {
      return await request(app.getHttpServer()).get('/faves').expect(200);
    });
  });
  describe('Get user faves ', () => {
    it('Valid Request', async () => {
      return await request(app.getHttpServer()).get('/faves/1').expect(200);
    });
    it('Valid Request', async () => {
      return await request(app.getHttpServer()).get('/faves/200').expect(200);
    });
  });
  describe('update fave', () => {
    it('valid', async () => {
      return await request(app.getHttpServer())
        .patch('/faves/1')
        .send({ rank: 200 })
        .expect(404);
    });
    it('invalid', async () => {
      return await request(app.getHttpServer())
        .patch('/faves/9981')
        .send({})
        .expect(404);
    });
  });
  describe('Delete fave', () => {
    it('valid', async () => {
      return await request(app.getHttpServer())
        .delete('/faves/1')
        .send({ rank: 200 })
        .expect(404);
    });
    it('invalid', async () => {
      return await request(app.getHttpServer())
        .delete('/faves/9981')
        .send({})
        .expect(404);
    });
  });
});
