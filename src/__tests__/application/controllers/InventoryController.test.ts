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

    it('checkAvailability', async () => {
        (InventoryService.checkRecipe as jest.Mock).mockResolvedValue(true);
        const test = InventoryController.checkAvailability(req, res)
        expect(test).toBeDefined()
    });

    it('updateInventory', async () => {
        (InventoryService.updateInventory as jest.Mock).mockResolvedValue({});
        const test = InventoryController.updateInventory(req, res)
        expect(test).toBeDefined()
    });

    it('reduceInventory', async () => {
        (InventoryService.reduceInventory as jest.Mock).mockResolvedValue({});
        const test = InventoryController.reduceInventory(req, res)
        expect(test).toBeDefined()
    });

    it('increaseInventory', async () => {
        (InventoryService.increaseInventory as jest.Mock).mockResolvedValue({});
        const test = InventoryController.increaseInventory(req, res)
        expect(test).toBeDefined()
    });
});