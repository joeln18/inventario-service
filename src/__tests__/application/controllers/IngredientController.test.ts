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
        const mockIngredients = [{ id: 1, name: 'Ingredient1' }, { id: 2, name: 'Ingredient2' }];
        (IngredientService.getAllIngredients as jest.Mock).mockResolvedValue(mockIngredients);
        const test = IngredientController.getAll(req, res)
        expect(test).toBeDefined()
    });

    it('should get ingredient by id', async () => {
        const mockIngredients = { id: 1, name: 'Ingredient1' };
        (IngredientService.getIngredientById as jest.Mock).mockResolvedValue(mockIngredients);
        const test = IngredientController.getById(req, res)
        expect(test).toBeDefined()
    });

    it('should create ingredient', async () => {
        const mockIngredients = { id: 1, name: 'Ingredient1' };
        (IngredientService.createIngredient as jest.Mock).mockResolvedValue(mockIngredients);
        const test = IngredientController.create(req, res)
        expect(test).toBeDefined()
    });

    it('should update ingredient', async () => {
        const mockIngredients = { id: 1, name: 'Ingredient1' };
        (IngredientService.updateIngredient as jest.Mock).mockResolvedValue(mockIngredients);
        const test = IngredientController.update(req, res)
        expect(test).toBeDefined()
    });

    it('should delete ingredient', async () => {
        const mockIngredients = { id: 1, name: 'Ingredient1' };
        (IngredientService.deleteIngredient as jest.Mock).mockResolvedValue(mockIngredients);
        const test = IngredientController.delete(req, res)
        expect(test).toBeDefined()
    });
});