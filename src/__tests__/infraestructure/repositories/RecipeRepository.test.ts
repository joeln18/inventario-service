
import Recipe from "../../../infraestructure/database/models/RecipeModel";
import RecipeRepository from "../../../infraestructure/repositories/RecipeRepository";


jest.mock('../../../infraestructure/database/models/RecipeModel.ts', () => ({
    findByPk: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
    findAll: jest.fn(),
  })); 

describe('RecipeRepository', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    
    it('should get all recipe', async () => {
        const mockRecipes = [{ id: 1, name: 'recipe1' }, { id: 2, name: 'recipe2' }];
        (Recipe.findAll as jest.Mock).mockResolvedValue(mockRecipes);
    
        const recipe = await RecipeRepository.getAll();
    
        expect(recipe).toEqual(mockRecipes);
        expect(Recipe.findAll).toHaveBeenCalledTimes(1);
    });
    
    it('should get recipe by id', async () => {
        const mockRecipe = { id: 1, name: 'recipe1' };
        (Recipe.findByPk as jest.Mock).mockResolvedValue(mockRecipe);
    
        const recipe = await RecipeRepository.getById(1);
    
        expect(recipe).toEqual(mockRecipe);
        expect(Recipe.findByPk).toHaveBeenCalledWith(1);
    });
    
    it('should create a new recipe', async () => {
        const mockNewRecipe = { name: 'New recipe' };
        (Recipe.create as jest.Mock).mockResolvedValue(mockNewRecipe);
    
        const recipe = await RecipeRepository.create(mockNewRecipe);
    
        expect(recipe).toEqual(mockNewRecipe);
        expect(Recipe.create).toHaveBeenCalledWith(mockNewRecipe);
    });
    
    it('should update an existing recipe', async () => {
        const mockUpdatedRecipe = { id: 1, name: 'Updated recipe' };
        (Recipe.update as jest.Mock).mockResolvedValue([1]);
        (Recipe.findByPk as jest.Mock).mockResolvedValue(mockUpdatedRecipe);
    
        const ingredient = await RecipeRepository.update(1, { name: 'Updated recipe' });
    
        expect(ingredient).toEqual(mockUpdatedRecipe);
        expect(Recipe.update).toHaveBeenCalledWith({ name: 'Updated recipe' }, { where: { id: 1 } });
    });
    
    it('should delete an recipe', async () => {
        (Recipe.destroy as jest.Mock).mockResolvedValue(1);
    
        const result = await RecipeRepository.delete(1);
    
        expect(result).toBe(1);
        expect(Recipe.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
    });
});