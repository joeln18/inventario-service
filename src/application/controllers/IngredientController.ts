import { Request, Response } from 'express';
import IngredientService from '../../domain/services/IngredientService';

class IngredientController {
    async getAll(req: Request, res: Response) {
        try {
            const ingredients = await IngredientService.getAllIngredients();
            res.status(200).json(ingredients);
        } catch (error) {
            res.status(400).json({ error: 'Failed to fetch ingredients' });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const ingredient = await IngredientService.getIngredientById(Number(req.params.id));
            res.status(200).json(ingredient);
        } catch (error) {
            res.status(400).json({ error: 'Failed to fetch ingredient' });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const newIngredient = await IngredientService.createIngredient(req.body);
            res.status(201).json(newIngredient);
        } catch (error) {
            res.status(400).json({ error: 'Failed to create ingredient' });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const updatedIngredient = await IngredientService.updateIngredient(Number(req.params.id), req.body);
            res.status(200).json(updatedIngredient);
        } catch (error) {
            res.status(400).json({ error: 'Failed to update ingredient' });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            await IngredientService.deleteIngredient(Number(req.params.id));
            res.status(200).json({ message: 'Ingredient deleted' });
        } catch (error) {
            res.status(400).json({ error: 'Failed to delete ingredient' });
        }
    }
}

export default new IngredientController();