import { Request, Response } from 'express';
import IngredientService from '../../domain/services/IngredientService';

class IngredientController {
    async getAll(req: Request, res: Response) {
        const ingredients = await IngredientService.getAllIngredients();
        res.status(200).json(ingredients);
    }

    async getById(req: Request, res: Response) {
        const ingredient = await IngredientService.getIngredientById(Number(req.params.id));
        res.json(ingredient);
    }

    async create(req: Request, res: Response) {
        const newIngredient = await IngredientService.createIngredient(req.body);
        res.json(newIngredient);
    }

    async update(req: Request, res: Response) {
        const updatedIngredient = await IngredientService.updateIngredient(Number(req.params.id), req.body);
        res.json(updatedIngredient);
    }

    async delete(req: Request, res: Response) {
        await IngredientService.deleteIngredient(Number(req.params.id));
        res.json({ message: 'Ingredient deleted' });
    }
}

export default new IngredientController();