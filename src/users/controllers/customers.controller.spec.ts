import { Test, TestingModule } from '@nestjs/testing';
import { CustomersService } from '../services/customers.service';
import { CustomersController } from './customers.controller';

describe('CustomersController', () => {
  let controller: CustomersController;

  const mockCustomersService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [CustomersService],
    })
      .overrideProvider(CustomersService)
      .useValue(mockCustomersService)
      .compile();

    controller = module.get<CustomersController>(CustomersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
