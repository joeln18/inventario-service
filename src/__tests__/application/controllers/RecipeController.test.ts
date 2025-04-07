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
        const mockRecipes = [
            {
                id: 1,
                nombre: 'recipe1',
                ingredients: [
                    { id: 1, name: 'Flour', quantity: 2, measureUnit: 'kg' }
                ]
            },
            {
                id: 2,
                nombre: 'recipe2',
                ingredients: []
            }
        ];

        (RecipeService.getAllRecipes as jest.Mock).mockResolvedValue(mockRecipes);

        await RecipeController.getAll(req, res);

        expect(test).toBeDefined()
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockRecipes);
    });


    it('should get recipe by id', async () => {
        const mockRecipe = {
            id: 1,
            nombre: 'recipe1',
            ingredients: [
                { id: 1, name: 'Sugar', quantity: 1, measureUnit: 'kg' }
            ]
        };

        req.params.id = '1';

        (RecipeService.getRecipeById as jest.Mock).mockResolvedValue(mockRecipe);

        await RecipeController.getById(req, res);

        expect(test).toBeDefined()
        expect(RecipeService.getRecipeById).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockRecipe);
    });


    it('should create recipe', async () => {
        const mockRecipe = {
            id: 1,
            nombre: 'recipe1',
            ingredients: [
                { id: 1, name: 'Salt', quantity: 1, measureUnit: 'kg' }
            ]
        };

        req.body = {
            nombre: 'recipe1',
            ingredients: mockRecipe.ingredients
        };

        (RecipeService.createRecipe as jest.Mock).mockResolvedValue(mockRecipe);

        await RecipeController.create(req, res);

        expect(test).toBeDefined()
        expect(RecipeService.createRecipe).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(mockRecipe);
    });


    it('should update recipe', async () => {
        const mockRecipe = {
            id: 1,
            nombre: 'updated recipe',
            ingredients: []
        };

        req.params.id = '1';
        req.body = {
            nombre: 'updated recipe',
            ingredients: []
        };

        (RecipeService.updateRecipe as jest.Mock).mockResolvedValue(mockRecipe);

        await RecipeController.update(req, res);

        expect(test).toBeDefined()
        expect(RecipeService.updateRecipe).toHaveBeenCalledWith(1, req.body);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockRecipe);
    });


    it('should delete recipe', async () => {
        req.params.id = '1';

        (RecipeService.deleteRecipe as jest.Mock).mockResolvedValue(undefined);

        await RecipeController.delete(req, res);

        expect(RecipeService.deleteRecipe).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Recipe deleted' });
    });
});

describe('RecipeController Error Handling', () => {
    let req: any;
    let res: any;

    beforeEach(() => {
        req = {
            params: {},
            body: {},
        };
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
        jest.clearAllMocks();
    });

    it('should return 400 on getAll error', async () => {
        (RecipeService.getAllRecipes as jest.Mock).mockRejectedValue(new Error('Failed to fetch recipes'));
        await RecipeController.getAll(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Failed to fetch recipes' });
    });

    it('should return 400 on getById error', async () => {
        req.params.id = '1';
        (RecipeService.getRecipeById as jest.Mock).mockRejectedValue(new Error('Failed to fetch recipe'));
        await RecipeController.getById(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Failed to fetch recipe' });
    });

    it('should return 400 on create error', async () => {
        req.body = {
            nombre: 'recipe1',
            ingredients: []
        };
        (RecipeService.createRecipe as jest.Mock).mockRejectedValue(new Error('Failed to create recipe'));
        await RecipeController.create(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Failed to create recipe' });
    });

    it('should return 400 on update error', async () => {
        req.params.id = '1';
        req.body = {
            nombre: 'updated recipe',
            ingredients: []
        };
        (RecipeService.updateRecipe as jest.Mock).mockRejectedValue(new Error('Failed to update recipe'));
        await RecipeController.update(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Failed to update recipe' });
    });

    it('should return 400 on delete error', async () => {
        req.params.id = '1';
        (RecipeService.deleteRecipe as jest.Mock).mockRejectedValue(new Error('Failed to delete recipe'));
        await RecipeController.delete(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Failed to delete recipe' });
    });
});
