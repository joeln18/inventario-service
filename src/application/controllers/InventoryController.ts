import { Request, Response } from 'express';
import InventoryService from '../../domain/services/InventoryService';

class InventoryController {
    async checkAvailability(req: Request, res: Response) {
        try {
            const recipe = await InventoryService.checkRecipe(Number(req.body.id_recipe));
            res.status(200).json({ available: recipe });
        } catch (error) {
            res.status(400).json({ error: 'Error checking recipe availability' });
        }
    }

    async updateInventory(req: Request, res: Response) {
        try {
            const updatedInventory = await InventoryService.updateInventory(Number(req.body.id_recipe));
            res.status(200).json(updatedInventory);
        } catch (error) {
            res.status(400).json({ error: 'Error updating inventory' });
        }
    }

    async reduceInventory(req: Request, res: Response) {
        try {
            const updatedInventory = await InventoryService.reduceInventory(
                Number(req.body.id_ingredient),
                Number(req.body.quantity)
            );
            res.status(200).json(updatedInventory);
        } catch (error) {
            res.status(400).json({ error: 'Error reducing inventory' });
        }
    }

    async increaseInventory(req: Request, res: Response) {
        try {
            const updatedInventory = await InventoryService.increaseInventory(
                Number(req.body.id_ingredient),
                Number(req.body.quantity)
            );
            res.status(200).json(updatedInventory);
        } catch (error) {
            res.status(400).json({ error: 'Error increasing inventory' });
        }
    }
}

export default new InventoryController();