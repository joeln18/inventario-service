import { RecipeDTO } from "../../application/dtos/RecipeDTO";
import RecipeRepository from "../../infraestructure/repositories/RecipeRepository";
import { IRecipe } from "../interfaces/IRecipe";


class RecipeService implements IRecipe {
    async getAllRecipes() {
        const recipes = await RecipeRepository.getAll();
        return RecipeDTO.fromModelArray(recipes);
    }

    async getRecipeById(id: number) {
        const recipe = await RecipeRepository.getById(id);
        return recipe ? RecipeDTO.fromModel(recipe) : null;
    }

    async createRecipe(data: any) {
        const recipe = await RecipeRepository.create(data);
        return RecipeDTO.fromModel(recipe);
    }

    async updateRecipe(id: number, data: any) {
        const recipe = await RecipeRepository.update(id, data);
        return recipe ? RecipeDTO.fromModel(recipe) : null;
    }

    async deleteRecipe(id: number) {
        return await RecipeRepository.delete(id);
    }
}

export default new RecipeService();