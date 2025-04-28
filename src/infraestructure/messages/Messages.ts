import InventoryService from "../../application/usecases/InventoryService";
import ConsumeAdapter from "../rabbitmq/ConsumeAdapter";
import PublisherAdapter from "../rabbitmq/PublisherAdapter";

const Messages = () => {
    const publisher = new PublisherAdapter();
    const consumer = new ConsumeAdapter();
    const inventoryService = new InventoryService(publisher, consumer);
    
    inventoryService.listenValidations();
}

export default Messages;

