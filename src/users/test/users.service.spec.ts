import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { User } from '../entities/users.entity';
import { UsersService } from '../services/users.service';
import { userStub } from './stubs/user.stub';
import { UserModel } from './support/user.model';

describe('UserService', () => {
  let userService: UsersService;
  let userModel: UserModel;
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
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useClass: UserModel,
        },
      ],
    }).compile();

    userService = moduleRef.get<UsersService>(UsersService);
    userModel = moduleRef.get<UserModel>(UserModel);

    jest.clearAllMocks();
  });

  describe('findOne', () => {
    describe('When findOne is called', () => {
      beforeEach(async () => {
        jest.spyOn(userModel, 'findOne');
        await userService.findOne(users[0].id);
      });
      it('then it should call userModel', () => {
        expect(userModel.findOne).toHaveBeenCalledWith(users[0].id);
      });
    });
  });
});
