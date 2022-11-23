import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import mockedConfigService from '../mocks/config.service';
import { ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
describe('User service test', () => {
  let userService: UsersService;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
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
            new: jest.fn(),
            save: jest.fn(),
            findOneBy: jest.fn(),
            delete: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();
    userService = await module.get(UsersService);
  });

  describe('Creating USer', () => {
    it('attempt to create user', async () => {
      expect.assertions(2);
      const moviespy = jest.spyOn(userService, 'create');
      await userService.create({
        name: 'olajuwon',
        email: 'olar@mails.com',
        password: 'admin1234',
      });
      expect(userService.create).toBeCalled();
      expect(moviespy).toBeCalled();
    });
    it('attempt to create user with null value', async () => {
      expect.assertions(3);
      const moviespy = jest.spyOn(userService, 'create');
      const x = await userService.create({
        name: 'olajuwon',
        email: 'olar@mails.com',
        password: 'admin1234',
      });
      expect(x).toBeDefined();
      expect(userService.create).toBeCalled();
      expect(moviespy).toBeCalled();
    });
  });
});
