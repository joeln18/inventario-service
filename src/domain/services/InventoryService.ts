import { InventoryDTO } from "../../application/dtos/InventoryDTO";
import InventoryRepository from "../../infraestructure/repositories/InventoryRepository";
import { IInventory } from "../interfaces/IInventory";


class InventoryService implements IInventory {
    async checkRecipe(id: number) {
        return await InventoryRepository.checkRecipeAvailability(id);
    }

    async updateInventory(id: number) {
        await InventoryRepository.updateInventoryForRecipe(id);
        return InventoryDTO.createSuccess('Inventory updated successfully');
    }

    async reduceInventory(id: number, quantity: number) {
        await InventoryRepository.reduceInventory(id, quantity);
            return InventoryDTO.createSuccess('Inventory reduced successfully');
    }

    async increaseInventory(id: number, quantity: number) {
        await InventoryRepository.increaseInventory(id, quantity);
        return InventoryDTO.createSuccess('Inventory increased successfully');
    }
}

export default new InventoryService();