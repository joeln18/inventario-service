import { IngredientDTO } from "../../application/dtos/IngredientDTO";
import IngredientRepository from "../../infraestructure/repositories/IngredientRepository";
import { IIngredient } from "../interfaces/IIngredient";

class IngredientService implements IIngredient {
    async getAllIngredients() {
        const ingredients = await IngredientRepository.getAll();
        return IngredientDTO.fromModelArray(ingredients);
    }

    async getIngredientById(id: number) {
        const ingredient = await IngredientRepository.getById(id);
        return ingredient ? IngredientDTO.fromModel(ingredient) : null;
    }

    async createIngredient(data: any) {
        const ingredient = await IngredientRepository.create(data);
        return IngredientDTO.fromModel(ingredient);
    }

    async updateIngredient(id: number, data: any) {
        const ingredient = await IngredientRepository.update(id, data);
        return ingredient ? IngredientDTO.fromModel(ingredient) : null;
    }

    async deleteIngredient(id: number) {
        return await IngredientRepository.delete(id);
    }
}

export default new IngredientService();