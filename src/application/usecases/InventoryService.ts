class InventoryService {
  public publisherPort: any;
  public consumerPort: any;

  constructor(publisherPort: any, consumerPort: any) {
    this.publisherPort = publisherPort;
    this.consumerPort = consumerPort;
  }

  async validInventory(pedido: any) {
    await this.publisherPort.publish('validar-inventario', pedido);
  }

  async listenValidations() {
    await this.consumerPort.consume('respuesta-inventario', (data: any) => {
      console.log('[Inventario] Respuesta recibida:', data);
      // Aquí procesas el evento recibido
    });
  }
}

export default InventoryService;