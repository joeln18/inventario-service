import Ingredient from "../database/models/IngredientModel";
import IngredientRecipe from "../database/models/IngredientRecipeModel";



class InventoryRepository {
    /**
     * Verifica si los ingredientes de una receta están disponibles en el inventario
     * @param recipeId ID de la receta
     * @returns boolean (true si todos los ingredientes están disponibles)
     */
    async checkRecipeAvailability(recipeId: number): Promise<boolean> {
        const recipes = await IngredientRecipe.findAll({where: { receta_id: recipeId }});

        if (!recipes) throw new Error("Recipe not found");
        if(recipes.length === 0) return false; // No hay ingredientes asociados a la receta
        for (const recipe of recipes) {
            const ingredient = await Ingredient.findOne({
                where: { id: recipe.dataValues.ingrediente_id}
            });

            if (!ingredient || ingredient.dataValues.cantidad < recipe.dataValues.cantidad) {
                return false; // No hay suficiente cantidad de algún ingrediente
            }
        }
        return true;
    }

    /**
     * Reduce los ingredientes de una receta en el inventario
     * @param recipeId ID de la receta
     */
    async updateInventoryForRecipe(recipeId: number): Promise<void> {
        const recipes = await IngredientRecipe.findAll({where: { receta_id: recipeId }});

        if (!recipes) throw new Error("Recipe not found");
        if(recipes.length === 0) throw new Error("Recipe not found"); 

        for (const recipe of recipes) {
            const ingredient = await Ingredient.findOne({
                where: { id: recipe.dataValues.ingrediente_id}
            });

            if (!ingredient) continue;

            const newQuantity = ingredient.dataValues.cantidad - recipe.dataValues.cantidad;
            if (newQuantity < 0) {
                throw new Error(`Not enough stock for ingredient: ${ingredient.dataValues.nombre}`);
            }

            await ingredient.update({ cantidad: newQuantity });
        }
    }

    async reduceInventory(ingredientId: number, quantity: number): Promise<void> {
        const ingredient = await Ingredient.findOne({ where: { id: ingredientId } });

        if (!ingredient) throw new Error("Ingredient not found");

        const newQuantity = ingredient.dataValues.cantidad - quantity;
        if (newQuantity < 0) {
            throw new Error(`Not enough stock for ingredient: ${ingredient.dataValues.nombre}`);
        }

        await ingredient.update({ cantidad: newQuantity });
    }
    
    async increaseInventory(ingredientId: number, quantity: number): Promise<void> {
        const ingredient = await Ingredient.findOne({ where: { id: ingredientId } });

        if (!ingredient) throw new Error("Ingredient not found");

        const newQuantity = ingredient.dataValues.cantidad + quantity;

        await ingredient.update({ cantidad: newQuantity });
    }
}

export default new InventoryRepository();