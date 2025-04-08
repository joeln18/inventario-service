import IngredientController from "../../../application/controllers/IngredientController";
import IngredientService from "../../../domain/services/IngredientService";

jest.mock('../../../domain/services/IngredientService.ts', () => ({
    getAllIngredients: jest.fn(),
    getIngredientById: jest.fn(),
    createIngredient: jest.fn(),
    updateIngredient: jest.fn(),
    deleteIngredient: jest.fn(),
}))

describe('IngredientController', () => {
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
    it('should get all ingredients', async () => {
        const mockIngredients = [
            { id: 1, name: 'Ingredient1', quantity: 10, measureUnit: 'kg' },
            { id: 2, name: 'Ingredient2', quantity: 5, measureUnit: 'g' }
        ];
        (IngredientService.getAllIngredients as jest.Mock).mockResolvedValue(mockIngredients);
        await IngredientController.getAll(req, res)
        expect(test).toBeDefined()
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockIngredients);
    });

    it('should get ingredient by id', async () => {
        const mockIngredients = { id: 1, name: 'Ingredient1', quantity: 10, measureUnit: 'kg' };
        req.params.id = 1;

        (IngredientService.getIngredientById as jest.Mock).mockResolvedValue(mockIngredients);

        await IngredientController.getById(req, res)

        expect(test).toBeDefined()
        expect(res.json).toHaveBeenCalledWith(mockIngredients);
        expect(IngredientService.getIngredientById).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    it('should create ingredient', async () => {
        const mockIngredients = { id: 1, name: 'Ingredient1', quantity: 10, measureUnit: 'kg' };
        req.body = { name: 'Ingredient1', quantity: 10, measureUnit: 'kg' };

        (IngredientService.createIngredient as jest.Mock).mockResolvedValue(mockIngredients);
        await IngredientController.create(req, res)

        expect(test).toBeDefined()
        expect(res.json).toHaveBeenCalledWith(mockIngredients);
        expect(IngredientService.createIngredient).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(201);
    });

    it('should update ingredient', async () => {
        const mockIngredients = { id: 1, name: 'Ingredient1', quantity: 10, measureUnit: 'kg' };
        req.params.id = 1;
        req.body = { name: 'Ingredient1', quantity: 10, measureUnit: 'kg' };
        (IngredientService.updateIngredient as jest.Mock).mockResolvedValue(mockIngredients);
        await IngredientController.update(req, res)

        expect(test).toBeDefined()
        expect(res.json).toHaveBeenCalledWith(mockIngredients);
        expect(IngredientService.updateIngredient).toHaveBeenCalledWith(1, req.body);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    it('should delete ingredient', async () => {
        const mockIngredients = { id: 1, name: 'Ingredient1', quantity: 10, measureUnit: 'kg' };
        req.params.id = 1;
        (IngredientService.deleteIngredient as jest.Mock).mockResolvedValue(mockIngredients);
        await IngredientController.delete(req, res)

        expect(test).toBeDefined()
        expect(res.json).toHaveBeenCalledWith({ message: 'Ingredient deleted' });
        expect(IngredientService.deleteIngredient).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(200);
    });
});

describe('IngredientController Error Handling', () => {
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
    });
    afterEach(() => {
        jest.clearAllMocks();
    }
    );
    it('should return 400 on getAll error', async () => {
        (IngredientService.getAllIngredients as jest.Mock).mockRejectedValue(new Error('Failed to fetch ingredients'));
        await IngredientController.getAll(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Failed to fetch ingredients' });
    });

    it('should return 400 on getById error', async () => {
        req.params.id = 1;
        (IngredientService.getIngredientById as jest.Mock).mockRejectedValue(new Error('Failed to fetch ingredient'));
        await IngredientController.getById(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Failed to fetch ingredient' });
    });

    it('should return 400 on create error', async () => {
        req.body = { name: 'Ingredient1', quantity: 10, measureUnit: 'kg' };
        (IngredientService.createIngredient as jest.Mock).mockRejectedValue(new Error('Failed to create ingredient'));
        await IngredientController.create(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Failed to create ingredient' });
    });

    it('should return 400 on update error', async () => {
        req.params.id = 1;
        req.body = { name: 'Ingredient1', quantity: 10, measureUnit: 'kg' };
        (IngredientService.updateIngredient as jest.Mock).mockRejectedValue(new Error('Failed to update ingredient'));
        await IngredientController.update(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Failed to update ingredient' });
    });

    it('should return 400 on delete error', async () => {
        req.params.id = 1;
        (IngredientService.deleteIngredient as jest.Mock).mockRejectedValue(new Error('Failed to delete ingredient'));
        await IngredientController.delete(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Failed to delete ingredient' });
    });
});
