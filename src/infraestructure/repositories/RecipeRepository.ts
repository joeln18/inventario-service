import Recipe from '../database/models/RecipeModel';

class RecipeRepository {
    async getAll() {
        return await Recipe.findAll();
    }

    async getById(id: number) {
        return await Recipe.findByPk(id);
    }

    async create(data: any) {
        return await Recipe.create(data);
    }

    async update(id: number, data: any) {
        await Recipe.update(data, { where: { id } });
        return await this.getById(id);
    }

    async delete(id: number) {
        return await Recipe.destroy({ where: { id } });
    }
}

export default new RecipeRepository();