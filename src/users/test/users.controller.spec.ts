import { Test } from '@nestjs/testing';

import { UsersController } from '../controllers/users.controller';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';
import { UsersService } from '../services/users.service';
import { userStub } from './stubs/user.stub';

jest.mock('../services/users.service');

describe('UserController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  const users = [
    {
      id: 'x, y, z',
      name: 'Fernando',
      email: 'fcordero@example.com',
      isAdmin: true,
    },
  ];

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    usersController = moduleRef.get<UsersController>(UsersController);
    usersService = moduleRef.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });

  describe('getUser', () => {
    describe('When getUser is called', () => {
      beforeEach(async () => {
        await usersController.getUser(userStub().id);
      });

      it('then it should call userService', () => {
        expect(usersService.findOne).toHaveBeenCalledWith(userStub().id);
      });

      it('then should return an user', () => {
        expect(users[0]).toEqual(userStub());
      });
    });
  });

  describe('getUsers', () => {
    describe('When getUsers is called', () => {
      const dto = { limit: 2, offset: 2 };

      beforeEach(async () => {
        await usersController.getUsers(dto);
      });

      it('then it should call userService', () => {
        expect(usersService.findAll).toHaveBeenCalledWith(dto);
      });

      it('then it should return an array of users', () => {
        expect(users).toEqual([userStub()]);
      });
    });
  });

  describe('createUser', () => {
    describe('When createUser is called', () => {
      let payload: CreateUserDto;

      beforeEach(async () => {
        payload = {
          name: userStub().name,
          email: userStub().email,
          isAdmin: userStub().isAdmin,
        };
        await usersController.createUser(payload);
      });

      it('then it should called userService', () => {
        expect(usersService.create).toHaveBeenCalledWith(payload);
      });

      it('then is should return that user created', () => {
        expect(users[0]).toEqual(userStub());
      });
    });
  });

  describe('updateUser', () => {
    describe('When updateUser is called', () => {
      let payload: UpdateUserDto;

      beforeEach(async () => {
        payload = {
          email: 'fcordero@example.cl',
        };
        await usersController.update(userStub().id, payload);
      });

      it('then it should call userService', () => {
        expect(usersService.update).toHaveBeenCalledWith(
          userStub().id,
          payload,
        );
      });

      it('then it should return an updated User', () => {
        expect(users[0]).toEqual(userStub());
      });
    });
  });

  describe('delete', () => {
    describe('When delete is called', () => {
      beforeEach(async () => {
        await usersController.delete(userStub().id);
      });

      it('then it should call userService', () => {
        expect(usersService.remove).toHaveBeenCalledWith(userStub().id);
      });

      it('then should return an user', () => {
        expect(users[0]).toEqual(userStub());
      });
    });
  });
});
