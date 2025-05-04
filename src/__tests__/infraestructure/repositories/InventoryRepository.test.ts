import Ingredient from "../../../infraestructure/database/models/IngredientModel";
import IngredientRecipe from "../../../infraestructure/database/models/IngredientRecipeModel";
import InventoryRepository from "../../../infraestructure/repositories/InventoryRepository";


jest.mock('../../../infraestructure/database/models/IngredientModel.ts', () => ({
    findByPk: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn()
}));

jest.mock('../../../infraestructure/database/models/IngredientRecipeModel.ts', () => ({
    findAll: jest.fn(),
}));

describe('InventoryRepository', () => {
    it('should check recipe availability', async () => {
        const mockIngredient = { id: 1, cantidad: 10 };
        const mockRecipe = {dataValues: { receta_id: 1, ingrediente_id: 1, cantidad: 5 }};
        (Ingredient.findOne as jest.Mock).mockResolvedValue(mockIngredient);
        (IngredientRecipe.findAll as jest.Mock).mockResolvedValue([mockRecipe]);

        const result = await InventoryRepository.checkRecipeAvailability(1);

        expect(result).toBe(true);
    });

    it('should check recipe availability', async () => {
        const mockRecipe = { receta_id: 1, ingrediente_id: 1, cantidad: 5 };
        (IngredientRecipe.findAll as jest.Mock).mockResolvedValue([mockRecipe]);
        (Ingredient.findOne as jest.Mock).mockResolvedValue(false);

        const result = await InventoryRepository.checkRecipeAvailability(1);

        expect(result).toBeFalsy();
    });

    it('should check recipe availability error', async () => {
        try {
            (IngredientRecipe.findAll as jest.Mock).mockResolvedValue(null);
            (Ingredient.findOne as jest.Mock).mockResolvedValue(false);
            expect(await InventoryRepository.checkRecipeAvailability(1)).rejects.toThrow('Recipe not found');
        } catch (error) {
            console.log('error >>> ', error);
        }
    });

    it('should check recipe availability lenght 0', async () => {
        (IngredientRecipe.findAll as jest.Mock).mockResolvedValue([]);
        expect(await InventoryRepository.checkRecipeAvailability(1)).toBeFalsy();
    });

    it('should check recipe availability', async () => {
        const mockRecipe = { receta_id: 1, ingrediente_id: 1, cantidad: 5 };
        (IngredientRecipe.findAll as jest.Mock).mockResolvedValue([mockRecipe]);
        (Ingredient.findOne as jest.Mock).mockResolvedValue({dataValues: { cantidad: 3 }});

        const result = await InventoryRepository.checkRecipeAvailability(1);

        expect(result).toBeTruthy();
    });

    it('should update inventory', async () => {
        const mockIngredient = {dataValues: { id: 1, cantidad: 3 }, update: jest.fn()};
        const mockRecipe = { receta_id: 1, ingrediente_id: 1, cantidad: 5 };
        (Ingredient.findOne as jest.Mock).mockResolvedValue(mockIngredient);
        (IngredientRecipe.findAll as jest.Mock).mockResolvedValue([mockRecipe]);

        const result = await InventoryRepository.updateInventoryForRecipe(1);

        expect(result).toBeUndefined();
    });

    it('should update inventory error', async () => {
        try {
            const mockIngredient = {dataValues: { id: 1, cantidad: 3 }, update: jest.fn()};
        const mockRecipe = {dataValues: { receta_id: 1, ingrediente_id: 1, cantidad: 5 }};
        (Ingredient.findOne as jest.Mock).mockResolvedValue(mockIngredient);
        (IngredientRecipe.findAll as jest.Mock).mockResolvedValue([mockRecipe]);

        expect(await InventoryRepository.updateInventoryForRecipe(1)).rejects.toThrow('Not enough stock for ingredient: undefined');
        } catch (error) {
            console.log('error >>> ', error);
        }
    });

    it('reduceInventory', async () => {
        (Ingredient.findOne as jest.Mock).mockResolvedValue({dataValues: {cantidad: 10}, update: jest.fn()});
        expect(InventoryRepository.reduceInventory(1, 5)).toBeDefined();
    });

    it('reduceInventory should throw an error if ingredient not found', async () => {
        try {
            (Ingredient.findOne as jest.Mock).mockResolvedValue({dataValues: {cantidad: 4}, update: jest.fn()});
            expect(await InventoryRepository.reduceInventory(1, 5)).rejects.toThrow('Not enough stock for ingredient: undefined');
        } catch (error) {
            console.log('error >>> ', error);
        }
        
    });

    it('incrementInventory should throw an error if ingredient not found', async () => {
        (Ingredient.findOne as jest.Mock).mockResolvedValue({dataValues: {cantidad: 2}, update: jest.fn()});
        expect(InventoryRepository.increaseInventory(1, 5)).toBeDefined();
    });

    it('should check order availability', async () => {
        const order = {idPedido: 1, items:[{ idReceta: 1, cantidad: 10 }]};
        const callback = jest.fn(() => true)
        const result = await InventoryRepository.checkOrderAvailability(order, callback);

        expect(result.availability).toBe(true);
    });

    it('should update inventory for order', async () => {
        const order = {idPedido: 1, items:[{ idReceta: 1, cantidad: 10 }]};
        const callback = jest.fn();
        await InventoryRepository.updateInventoryForOrder(order, callback);

        expect(callback).toHaveBeenCalled();
    });
});