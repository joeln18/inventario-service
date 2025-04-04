import { Request, Response } from 'express';
import RecipeService from '../../domain/services/RecipeService';

class RecipeController {
    async getAll(req: Request, res: Response) {
        const recipes = await RecipeService.getAllRecipes();
        res.json(recipes);
    }

    async getById(req: Request, res: Response) {
        const recipe = await RecipeService.getRecipeById(Number(req.params.id));
        res.json(recipe);
    }

    async create(req: Request, res: Response) {
        const newRecipe = await RecipeService.createRecipe(req.body);
        res.json(newRecipe);
    }

    async update(req: Request, res: Response) {
        const updatedRecipe = await RecipeService.updateRecipe(Number(req.params.id), req.body);
        res.json(updatedRecipe);
    }

    async delete(req: Request, res: Response) {
        await RecipeService.deleteRecipe(Number(req.params.id));
        res.json({ message: 'Recipe deleted' });
    }
}

export default new RecipeController();