import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from '../entities/users.entity';

describe('UsersService', () => {
  let service: UsersService;

  const mockUserModel = {
    create: jest.fn().mockImplementation((dto) => dto),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should create a new user saved and return that user', async () => {
    expect(
      await service.create({
        name: 'Fernando',
        email: 'fcordero@example.com',
        isAdmin: true,
      }),
    ).toEqual({
      id: expect.any(String),
      name: 'Fernando',
      email: 'fcordero@example.com',
      isAdmin: true,
    });
  });
});
