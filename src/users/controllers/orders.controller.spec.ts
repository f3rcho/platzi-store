import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from '../services/orders.service';

describe('OrdersController', () => {
  let controller: OrdersController;

  const mockOrdersService = {
    create: jest.fn((dto) => {
      return {
        id: 'x,y,z',
        ...dto,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [OrdersService],
    })
      .overrideProvider(OrdersService)
      .useValue(mockOrdersService)
      .compile();

    controller = module.get<OrdersController>(OrdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Should create an order', () => {
    expect(
      controller.createOrder({
        customer: '1234',
        date: new Date(),
        products: ['prodA', 'prodB'],
      }),
    ).toEqual({
      id: 'x,y,zw',
      customer: '1234',
      date: new Date(),
      products: ['prodA', 'prodB'],
    });
  });
});
