import InventoryRepository from "../../infraestructure/repositories/InventoryRepository";
import { IOrderAvailability } from "../interfaces/InventoryAvailability";

class InventoryService {
  public publisherPort: any;
  public consumerPort: any;

  constructor(publisherPort: any, consumerPort: any) {
    this.publisherPort = publisherPort;
    this.consumerPort = consumerPort;
  }

  async publishEvent(event: string, data: object) {
    await this.publisherPort.publish(event, data);
  }

  async validateOrder(order: IOrderAvailability) {
    if (order.idPedido && order?.items?.length > 0){
      const {
        checkOrderAvailability, 
        updateInventoryForOrder, 
        checkRecipeAvailability,
        updateInventoryForRecipe
      } = InventoryRepository;
      const responseOrderAvailability = await checkOrderAvailability(order, checkRecipeAvailability);
      console.log('responseOrderAvailability ', JSON.stringify(responseOrderAvailability));
      this.publishEvent('DisponibilidadValidada', responseOrderAvailability);
      if(responseOrderAvailability.availability){
        await updateInventoryForOrder(order, updateInventoryForRecipe);
        this.publishEvent('InventarioActualizado', {idPedido: order.idPedido});
      }
    }
  }

  async listenValidations() {
    await this.consumerPort.consume('PedidoCreado', (data: IOrderAvailability) => {
      console.log('[Inventario] Respuesta recibida:', data);
      this.validateOrder(data);
    });
  }
}

export default InventoryService;