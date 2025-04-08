import InventoryController from "../../../application/controllers/InventoryController";
import InventoryService from "../../../domain/services/InventoryService";


jest.mock('../../../domain/services/InventoryService.ts', () => ({
    checkRecipe: jest.fn(),
    updateInventory: jest.fn(),
    reduceInventory: jest.fn(),
    increaseInventory: jest.fn(),
}));

describe('InventoryController', () => {
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
    });

    it('should check availability', async () => {
        (InventoryService.checkRecipe as jest.Mock).mockResolvedValue(true);
        req.body = { id_recipe: 1 };

        await InventoryController.checkAvailability(req, res);

        expect(test).toBeDefined()
        expect(InventoryService.checkRecipe).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ available: true });
    });

    it('should update inventory', async () => {
        const updated = { success: true };
        (InventoryService.updateInventory as jest.Mock).mockResolvedValue(updated);
        req.body = { id_recipe: 1 };

        await InventoryController.updateInventory(req, res);

        expect(test).toBeDefined()
        expect(InventoryService.updateInventory).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(updated);
    });

    it('should reduce inventory', async () => {
        const result = { success: true };
        (InventoryService.reduceInventory as jest.Mock).mockResolvedValue(result);
        req.body = { id_ingredient: 2, quantity: 5 };

        await InventoryController.reduceInventory(req, res);

        expect(test).toBeDefined()
        expect(InventoryService.reduceInventory).toHaveBeenCalledWith(2, 5);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(result);
    });

    it('should increase inventory', async () => {
        const result = { success: true };
        (InventoryService.increaseInventory as jest.Mock).mockResolvedValue(result);
        req.body = { id_ingredient: 2, quantity: 10 };

        await InventoryController.increaseInventory(req, res);

        expect(test).toBeDefined()
        expect(InventoryService.increaseInventory).toHaveBeenCalledWith(2, 10);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(result);
    });
});

describe('InventoryController - errores', () => {
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

    it('should return 400 on checkAvailability error', async () => {
        (InventoryService.checkRecipe as jest.Mock).mockRejectedValue(new Error());
        await InventoryController.checkAvailability(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Error checking recipe availability' });
    });

    it('should return 400 on updateInventory error', async () => {
        (InventoryService.updateInventory as jest.Mock).mockRejectedValue(new Error());
        await InventoryController.updateInventory(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Error updating inventory' });
    });

    it('should return 400 on reduceInventory error', async () => {
        (InventoryService.reduceInventory as jest.Mock).mockRejectedValue(new Error());
        await InventoryController.reduceInventory(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Error reducing inventory' });
    });

    it('should return 400 on increaseInventory error', async () => {
        (InventoryService.increaseInventory as jest.Mock).mockRejectedValue(new Error());
        await InventoryController.increaseInventory(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Error increasing inventory' });
    });
});
