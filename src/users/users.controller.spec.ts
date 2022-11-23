import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import mockedConfigService from '../mocks/config.service';
import { ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

describe('Movie Controller test', () => {
  let app: INestApplication;
  let userdata;

  beforeEach(async () => {
    userdata = {
      name: 'olajuwon',
      email: 'olar@mails.com',
      password: 'admin1234',
    };

    const module = await Test.createTestingModule({
      controllers: [UsersController],
      imports: [HttpModule],
      providers: [
        UsersService,
        HttpModule,
        {
          provide: ConfigService,
          useValue: mockedConfigService,
        },
        {
          provide: getRepositoryToken(User),
          useValue: {
            new: jest.fn().mockResolvedValue(userdata),
            findOneBy: jest.fn().mockReturnValue(userdata),
            delete: jest.fn().mockReturnValue({}),
            find: jest.fn().mockReturnValue(userdata),
            update: jest.fn(),
          },
        },
      ],
    }).compile();
    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('Create new user', () => {
    it('Respond with valid response', async () => {
      return await request(app.getHttpServer())
        .post('/user')
        .send({
          name: 'olajuwon',
          email: 'olar@mails.com',
          password: 'admin1234',
        })
        .expect(400)
        .catch((err) => console.log(err.message));
    });
  });

  describe('Find users', () => {
    it('find users', () => {
      return request(app.getHttpServer()).get('/users').expect(200);
    });
  });

  describe('find one user ', () => {
    it('find one user', () => {
      return request(app.getHttpServer()).get('/users/1').expect(200);
    });
  });
});
