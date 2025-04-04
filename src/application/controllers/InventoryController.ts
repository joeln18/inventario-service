import { Request, Response } from 'express';
import InventoryService from '../../domain/services/InventoryService';

class InventoryController {
    async checkAvailability(req: Request, res: Response) {
        const recipe = await InventoryService.checkRecipe(Number(req.body.id_recipe));
        res.json({ available: recipe });
    }

    async updateInventory(req: Request, res: Response) {
        const updatedInventory = await InventoryService.updateInventory(Number(req.body.id_recipe));
        res.json(updatedInventory);
    }

    async reduceInventory(req: Request, res: Response) {
        const updatedInventory = await InventoryService.reduceInventory(Number(req.body.id_ingredient), Number(req.body.quantity));
        res.json(updatedInventory);
    }

    async increaseInventory(req: Request, res: Response) {
        const updatedInventory = await InventoryService.increaseInventory(Number(req.body.id_ingredient), Number(req.body.quantity));
        res.json(updatedInventory);
    }
}

export default new InventoryController();