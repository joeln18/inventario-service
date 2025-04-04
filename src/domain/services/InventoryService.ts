import InventoryRepository from "../../infraestructure/repositories/InventoryRepository";
import { IInventory } from "../interfaces/IInventory";


class InventoryService implements IInventory {
    async checkRecipe(id: number) {
        return await InventoryRepository.checkRecipeAvailability(id);
    }

    async updateInventory(id: number) {
        return await InventoryRepository.updateInventoryForRecipe(id);
    }

    async reduceInventory(id: number, quantity: number) {
        return await InventoryRepository.reduceInventory(id, quantity);
    }

    async increaseInventory(id: number, quantity: number) {
        return await InventoryRepository.increaseInventory(id, quantity);
    }
}

export default new InventoryService();