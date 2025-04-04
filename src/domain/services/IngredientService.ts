import { IngredientDTO } from "../../application/dtos/IngredientDTO";
import IngredientRepository from "../../infraestructure/repositories/IngredientRepository";
import { IIngredient } from "../interfaces/IIngredient";

class IngredientService implements IIngredient {
    async getAllIngredients() {
        const ingredients = await IngredientRepository.getAll();
        return IngredientDTO.fromModelArray(ingredients);
    }

    async getIngredientById(id: number) {
        return await IngredientRepository.getById(id);
    }

    async createIngredient(data: any) {
        return await IngredientRepository.create(data);
    }

    async updateIngredient(id: number, data: any) {
        return await IngredientRepository.update(id, data);
    }

    async deleteIngredient(id: number) {
        return await IngredientRepository.delete(id);
    }
}

export default new IngredientService();