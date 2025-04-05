import Ingredient from "../../../infraestructure/database/models/IngredientModel";
import IngredientRepository from "../../../infraestructure/repositories/IngredientRepository";

jest.mock('../../../infraestructure/database/models/IngredientModel.ts', () => ({
    findByPk: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
    findAll: jest.fn(),
})); 

describe('IngredientRepository', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    
    it('should get all ingredients', async () => {
        const mockIngredients = [{ id: 1, name: 'Ingredient1' }, { id: 2, name: 'Ingredient2' }];
        (Ingredient.findAll as jest.Mock).mockResolvedValue(mockIngredients);
    
        const ingredients = await IngredientRepository.getAll();
    
        expect(ingredients).toEqual(mockIngredients);
        expect(Ingredient.findAll).toHaveBeenCalledTimes(1);
    });
    
    it('should get ingredient by id', async () => {
        const mockIngredient = { id: 1, name: 'Ingredient1' };
        (Ingredient.findByPk as jest.Mock).mockResolvedValue(mockIngredient);
    
        const ingredient = await IngredientRepository.getById(1);
    
        expect(ingredient).toEqual(mockIngredient);
        expect(Ingredient.findByPk).toHaveBeenCalledWith(1);
    });
    
    it('should create a new ingredient', async () => {
        const mockNewIngredient: any = { name: 'New Ingredient' };
        (Ingredient.create as jest.Mock).mockResolvedValue(mockNewIngredient);
    
        const ingredient = await IngredientRepository.create(mockNewIngredient);
    
        expect(ingredient).toEqual(mockNewIngredient);
        expect(Ingredient.create).toHaveBeenCalledWith(mockNewIngredient);
    });
    
    it('should update an existing ingredient', async () => {
        const mockUpdatedIngredient: any = { id: 1, name: 'Updated Ingredient' };
        (Ingredient.update as jest.Mock).mockResolvedValue([1]);
        (Ingredient.findByPk as jest.Mock).mockResolvedValue(mockUpdatedIngredient);
        const dataMock: any = { name: 'Updated Ingredient' };
        const ingredient = await IngredientRepository.update(1, dataMock);
    
        expect(ingredient).toEqual(mockUpdatedIngredient);
        expect(Ingredient.update).toHaveBeenCalledWith({ name: 'Updated Ingredient' }, { where: { id: 1 } });
    });
    
    it('should delete an ingredient', async () => {
        (Ingredient.destroy as jest.Mock).mockResolvedValue(1);
    
        const result = await IngredientRepository.delete(1);
    
        expect(result).toBe(1);
        expect(Ingredient.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
    });
});