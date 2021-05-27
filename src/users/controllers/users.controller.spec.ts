import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../services/users.service';
import { UsersController } from './users.controller';

describe('UsersController', () => {
  let controller: UsersController;

  const users = [
    {
      id: 'x,y,z',
      name: 'Fernando',
      email: 'fcordero@example.com',
      isAdmin: true,
    },
    {
      id: 'x,y,y',
      name: 'Dama',
      email: 'dcastillo@example.com',
      isAdmin: false,
    },
  ];
  const mockUserService = {
    create: jest.fn((dto) => {
      return {
        id: 'xyz',
        ...dto,
      };
    }),

    findAll: jest.fn((dto) => {
      if (!dto) return null;
      return users;
    }),

    findOne: jest.fn((id) => {
      if (!id) return null;
      const user = users.filter((item) => item.id);
      return user;
    }),

    update: jest.fn((id) => {
      if (id) {
        const user = users.filter((item) => item.id);
        return user;
      }
    }),

    remove: jest.fn((id) => {
      if (id) {
        return true;
      }
    }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUserService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('Should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Should create an user', () => {
    expect(
      controller.createUser({
        name: 'Fernando',
        email: 'fcordero@example.com',
        isAdmin: true,
      }),
    ).toEqual({
      id: 'xyz',
      name: 'Fernando',
      email: 'fcordero@example.com',
      isAdmin: true,
    });
  });

  it('Should return an array of users', () => {
    const FilterUserDto = { limit: 2, offset: 2 };
    expect(controller.getUsers(FilterUserDto)).toEqual(users);
  });

  it('Should return an user', () => {
    const id = 'x, y, z';
    const user = users.filter((item) => item.id);

    expect(controller.getUser(id)).toEqual(user);
  });

  it('Should return an user updated', () => {
    const id = 'x,y,z';

    const payload = {
      name: 'fernando',
      email: 'fcordero@example.com',
    };
    expect(controller.update(id, payload)).toStrictEqual(users);
  });

  it('Should return a trusty value', () => {
    const id = 'x, y, z';
    expect(controller.delete(id)).toBeTruthy();
  });
});
