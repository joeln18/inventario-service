import Ingredient from "../database/models/IngredientModel";


class IngredientRepository {
    async getAll(): Promise<Ingredient[]> {
        const ingredients = await Ingredient.findAll();
        return ingredients;
    }

    async getById(id: number) {
        const ingredient = await Ingredient.findByPk(id);
        return ingredient;
    }

    async create(data: Partial<Ingredient>) {
        return await Ingredient.create(data);
    }

    async update(id: number, data: Partial<Ingredient>) {
        await Ingredient.update(data, { where: { id } });
        return await this.getById(id);
    }

    async delete(id: number) {
        return await Ingredient.destroy({ where: { id } });
    }
}

export default new IngredientRepository();