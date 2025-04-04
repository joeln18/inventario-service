

export interface IInventory {
    checkRecipe(id: number): Promise<boolean>;
    updateInventory(id: number): Promise<void>;
    reduceInventory(id: number, quantity: number): Promise<void>;
    increaseInventory(id: number, quantity: number): Promise<void>;
}