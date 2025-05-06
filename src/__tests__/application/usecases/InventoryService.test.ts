// InventoryService.test.ts

import { IOrderAvailability } from "../../../application/interfaces/InventoryAvailability";
import InventoryService from "../../../application/usecases/InventoryService";
import InventoryRepository from "../../../infraestructure/repositories/InventoryRepository";


jest.mock('../../../infraestructure/repositories/InventoryRepository', () => ({
  checkOrderAvailability: jest.fn(),
  updateInventoryForOrder: jest.fn(),
  checkRecipeAvailability: jest.fn(),
  updateInventoryForRecipe: jest.fn(),
}));

describe('InventoryService', () => {
  let publisherPort: any;
  let consumerPort: any;
  let service: InventoryService;

  beforeEach(() => {
    publisherPort = { publish: jest.fn() };
    consumerPort = { consume: jest.fn() };
    service = new InventoryService(publisherPort, consumerPort);

    jest.clearAllMocks();
  });

  it('should publish an event using publisherPort', async () => {
    const event = 'TestEvent';
    const data = { key: 'value' };

    await service.publishEvent(event, data);

    expect(publisherPort.publish).toHaveBeenCalledWith(event, data);
  });

  it('should validate order, publish events, and update inventory when available', async () => {
    const order: IOrderAvailability = {
      idPedido: 123,
      itemPedidos: [{ idReceta: 1, cantidad: 2 }],
    };

    const mockAvailabilityResponse = { availability: true };

    (InventoryRepository.checkOrderAvailability as jest.Mock).mockResolvedValueOnce(mockAvailabilityResponse);
    (InventoryRepository.updateInventoryForOrder as jest.Mock).mockResolvedValueOnce(undefined);

    await service.validateOrder(order);

    expect(InventoryRepository.checkOrderAvailability).toHaveBeenCalledWith(
      order,
      InventoryRepository.checkRecipeAvailability
    );

    expect(publisherPort.publish).toHaveBeenCalledWith('DisponibilidadValidada', mockAvailabilityResponse);
    expect(InventoryRepository.updateInventoryForOrder).toHaveBeenCalledWith(
      order,
      InventoryRepository.updateInventoryForRecipe
    );
    expect(publisherPort.publish).toHaveBeenCalledWith('InventarioActualizado', { idPedido: order.idPedido });
  });

  it('should validate order and publish only DisponibilidadValidada if not available', async () => {
    const order: IOrderAvailability = {
      idPedido: 456,
      itemPedidos: [{ idReceta: 1, cantidad: 1 }],
    };

    const mockAvailabilityResponse = { availability: false };

    (InventoryRepository.checkOrderAvailability as jest.Mock).mockResolvedValueOnce(mockAvailabilityResponse);

    await service.validateOrder(order);

    expect(InventoryRepository.checkOrderAvailability).toHaveBeenCalledWith(
      order,
      InventoryRepository.checkRecipeAvailability
    );

    expect(publisherPort.publish).toHaveBeenCalledWith('DisponibilidadValidada', mockAvailabilityResponse);
    expect(InventoryRepository.updateInventoryForOrder).not.toHaveBeenCalled();
    expect(publisherPort.publish).not.toHaveBeenCalledWith('InventarioActualizado', expect.anything());
  });

  it('should not do anything if order is invalid (no idPedido or empty items)', async () => {
    const invalidOrders: IOrderAvailability[] | any = [
      { idPedido: 1, itemPedidos: [] },
      { idPedido: 2, itemPedidos: [] },
      { idPedido: undefined, itemPedidos: [{ idReceta: 1, cantidad: 1 }] },
    ];

    for (const order of invalidOrders) {
      await service.validateOrder(order);

      expect(InventoryRepository.checkOrderAvailability).not.toHaveBeenCalled();
      expect(publisherPort.publish).not.toHaveBeenCalled();
    }
  });

  it('should set up consumerPort to listen to PedidoCreado and trigger validateOrder', async () => {
    const mockData: IOrderAvailability = { idPedido: 789, itemPedidos: [{ idReceta: 1, cantidad: 3 }] };

    await service.listenValidations();

    expect(consumerPort.consume).toHaveBeenCalledWith('PedidoCreado', expect.any(Function));

    // Simulate receiving a message
    const callback = (consumerPort.consume as jest.Mock).mock.calls[0][1];

    const validateOrderSpy = jest.spyOn(service, 'validateOrder').mockResolvedValueOnce(undefined);

    await callback(mockData);

    expect(validateOrderSpy).toHaveBeenCalledWith(mockData);
  });
});