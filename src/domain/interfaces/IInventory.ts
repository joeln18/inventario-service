import { InventoryDTO } from "../../application/dtos/InventoryDTO";


export interface IInventory {
    checkRecipe(id: number): Promise<boolean>;
    updateInventory(id: number): Promise<InventoryDTO>;
    reduceInventory(id: number, quantity: number): Promise<InventoryDTO>;
    increaseInventory(id: number, quantity: number): Promise<InventoryDTO>;
}