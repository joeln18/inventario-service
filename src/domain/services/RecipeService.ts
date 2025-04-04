import RecipeRepository from "../../infraestructure/repositories/RecipeRepository";
import { IRecipe } from "../interfaces/IRecipe";


class RecipeService implements IRecipe {
    async getAllRecipes() {
        return await RecipeRepository.getAll();
    }

    async getRecipeById(id: number) {
        return await RecipeRepository.getById(id);
    }

    async createRecipe(data: any) {
        return await RecipeRepository.create(data);
    }

    async updateRecipe(id: number, data: any) {
        return await RecipeRepository.update(id, data);
    }

    async deleteRecipe(id: number) {
        return await RecipeRepository.delete(id);
    }
}

export default new RecipeService();