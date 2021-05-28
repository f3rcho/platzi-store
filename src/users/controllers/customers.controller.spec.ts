import { Test, TestingModule } from '@nestjs/testing';
import { CustomersService } from '../services/customers.service';
import { CustomersController } from './customers.controller';

describe('CustomersController', () => {
  let controller: CustomersController;

  const customers = [
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
  const mockCustomersService = {
    create: jest.fn((dto) => {
      return {
        id: 'x,y,z',
        ...dto,
      };
    }),
    findAll: jest.fn((dto) => {
      if (!dto) return false;
      return customers;
    }),
    findOne: jest.fn((id) => {
      const customer = customers.filter((cust) => cust.id === id);
      return customer;
    }),
    update: jest.fn((id, payload) => {
      const customer = customers.filter((cus) => cus.id === id);
      if (!customer) return false;
      const index = customers.findIndex((item) => item.id === id);
      customers[index] = {
        ...customer,
        ...payload,
      };
      return customer[index];
    }),
    remove: jest.fn((id) => (id ? true : false)),
  };

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
  // controller defined
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  // create an customer
  it('should create a customer', () => {
    expect(
      controller.createCustomer({
        name: 'f3rcho',
        email: 'fcordero@example.com',
        skills: [{ name: 'run', color: 'blue' }],
      }),
    ).toEqual({
      id: 'x,y,z',
      name: 'f3rcho',
      email: 'fcordero@example.com',
      skills: [{ name: 'run', color: 'blue' }],
    });
  });
  // get all customers
  it('should return an array of customers', () => {
    const FilterCustomerDto = { limit: 2, offset: 2 };
    expect(controller.getCustumers(FilterCustomerDto)).toEqual(customers);
  });
  // get one customer
  it('should return a customer', () => {
    const id = 'x,y,z';
    const customer = customers.filter((cust) => cust.id === id);
    expect(controller.getCustumer(id)).toEqual(customer);
  });
  // update a customer
  it('should return an updated customer', () => {
    const id = 'x,y,z';
    const payload = {
      name: 'fer',
    };
    const [customer] = customers.filter((cus) => cus.id === id);
    expect(controller.update(id, payload)).toStrictEqual(customer);
  });
  // delete a customer
  it('should return a truthy value', () => {
    const id = 'x, y,z';
    expect(controller.delete(id)).toBeTruthy();
  });
});
