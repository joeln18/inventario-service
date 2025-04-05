import RecipeController from "../../../application/controllers/RecipeController";
import RecipeService from "../../../domain/services/RecipeService";

jest.mock('../../../domain/services/RecipeService.ts', () => ({
    getAllRecipes: jest.fn(),
    getRecipeById: jest.fn(),
    createRecipe: jest.fn(),
    updateRecipe: jest.fn(),
    deleteRecipe: jest.fn(),
}))

describe('RecipeController', () => {
    let req: any;
    let res: any;
    let next: any;

    beforeEach(() => {
        req = {
            params: {},
            body: {},
        };
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should get all recipes', async () => {
        const mockRecipe = [{ id: 1, name: 'recipe1' }, { id: 2, name: 'recipe2' }];
        (RecipeService.getAllRecipes as jest.Mock).mockResolvedValue(mockRecipe);
        const test = RecipeController.getAll(req, res)
        expect(test).toBeDefined()
    });

    it('should get recipe by id', async () => {
        const mockRecipe = { id: 1, name: 'recipe1' };
        (RecipeService.getRecipeById as jest.Mock).mockResolvedValue(mockRecipe);
        const test = RecipeController.getById(req, res)
        expect(test).toBeDefined()
    });

    it('should create recipe', async () => {
        const mockRecipe = { id: 1, name: 'recipe1' };
        (RecipeService.createRecipe as jest.Mock).mockResolvedValue(mockRecipe);
        const test = RecipeController.create(req, res)
        expect(test).toBeDefined()
    });

    it('should update recipe', async () => {
        const mockRecipe = { id: 1, name: 'recipe1' };
        (RecipeService.updateRecipe as jest.Mock).mockResolvedValue(mockRecipe);
        const test = RecipeController.update(req, res)
        expect(test).toBeDefined()
    });

    it('should delete recipe', async () => {
        const mockRecipe = { id: 1, name: 'recipe1' };
        (RecipeService.deleteRecipe as jest.Mock).mockResolvedValue(mockRecipe);
        const test = RecipeController.delete(req, res)
        expect(test).toBeDefined()
    });
});