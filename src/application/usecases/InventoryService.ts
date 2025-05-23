import InventoryRepository from "../../infraestructure/repositories/InventoryRepository";
import { SocketClient } from "../../infraestructure/socket/SocketClient";
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
    if (order.idPedido && order?.itemPedidos?.length > 0){
      const {
        checkOrderAvailability, 
        updateInventoryForOrder, 
        checkRecipeAvailability,
        updateInventoryForRecipe
      } = InventoryRepository;

      const socket = new SocketClient();
      const responseOrderAvailability = await checkOrderAvailability(order, checkRecipeAvailability);
      console.log('responseOrderAvailability ', JSON.stringify(responseOrderAvailability));
      this.publishEvent('DisponibilidadValidada', responseOrderAvailability);
      socket.emit('disponibilidadValidada ', responseOrderAvailability);

      if(responseOrderAvailability.availability){
        await updateInventoryForOrder(order, updateInventoryForRecipe);
        this.publishEvent('InventarioActualizado', {idPedido: order.idPedido});
        socket.emit('inventarioActualizado ', {idPedido: order.idPedido});
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