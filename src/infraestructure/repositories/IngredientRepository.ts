import Ingredient from "../database/models/IngredientModel";


class IngredientRepository {
    async getAll(): Promise<Ingredient[]> {
        const ingredients = await Ingredient.findAll();
        console.log(' ingredients ', ingredients.map(ingredient => ingredient.dataValues));
        return ingredients;
    }

    async getById(id: number) {
        const ingredient = await Ingredient.findByPk(id);
        console.log(' ingredient ', ingredient?.dataValues);
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