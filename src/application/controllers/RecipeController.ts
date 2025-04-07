import { Request, Response } from 'express';
import RecipeService from '../../domain/services/RecipeService';

class RecipeController {
    async getAll(req: Request, res: Response) {
        try {
            const recipes = await RecipeService.getAllRecipes();
            res.status(200).json(recipes);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch recipes' });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const recipe = await RecipeService.getRecipeById(Number(req.params.id));
            res.status(200).json(recipe);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch recipe' });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const newRecipe = await RecipeService.createRecipe(req.body);
            res.status(201).json(newRecipe);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create recipe' });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const updatedRecipe = await RecipeService.updateRecipe(Number(req.params.id), req.body);
            res.status(200).json(updatedRecipe);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update recipe' });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            await RecipeService.deleteRecipe(Number(req.params.id));
            res.status(200).json({ message: 'Recipe deleted' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete recipe' });
        }
    }
}

export default new RecipeController();