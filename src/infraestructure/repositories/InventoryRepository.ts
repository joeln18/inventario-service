import { IOrderAvailability, IResponseOrderAvailability } from "../../application/interfaces/InventoryAvailability";
import Ingredient from "../database/models/IngredientModel";
import IngredientRecipe from "../database/models/IngredientRecipeModel";



class InventoryRepository {

    /**
     * Verifica si los items de un pedido estan disponibles
     * @param recipeId ID de la receta
     * @param callback checkRecipeAvailability
     * @returns IResponseOrderAvailability
     */
    async checkOrderAvailability(order: IOrderAvailability, callback: Function): Promise<IResponseOrderAvailability> {
        let items: any = [];
        for (const item of order.itemPedidos) {
            try {
                const availabilityItem = await callback(item.idReceta, item.cantidad);
                items.push({ ...item, availability: availabilityItem });
            } catch (error) {
                console.log('error in checkOrderAvailability ', error);
                items.push({ ...item, availability: false });
            }
        }
        return { idPedido: order.idPedido, availability: !items.find((item: any) => item.availability === false), items };
    }

    /**
     * Verifica si los ingredientes de una receta están disponibles en el inventario
     * @param recipeId ID de la receta
     * @returns boolean (true si todos los ingredientes están disponibles)
     */
    async checkRecipeAvailability(recipeId: number, quantity: number = 1): Promise<boolean> {
        const recipes = await IngredientRecipe.findAll({ where: { receta_id: recipeId } });
        if (!recipes) throw new Error("Recipe not found");
        if (recipes.length === 0) return false; // No hay ingredientes asociados a la receta
        for (const recipe of recipes) {
            const ingredient = await Ingredient.findOne({
                where: { id: recipe.dataValues?.ingrediente_id }
            });

            if (!ingredient || ingredient.dataValues?.cantidad < recipe.dataValues?.cantidad * quantity) {
                return false; // No hay suficiente cantidad de algún ingrediente
            }
        }
        return true;
    }

    /**
     * Actualiza el inventario de acuerdo al pedido recibido
     * @param recipeId ID de la receta
     * @param callback updateInventoryForRecipe
     */
    async updateInventoryForOrder(order: IOrderAvailability, callback: Function): Promise<void>{
        for (const recipe of order.itemPedidos) {
            try {
                await callback(recipe.idReceta, recipe.cantidad);
            } catch (error) {
                console.log(error);
            }
        }
    }

    /**
     * Reduce los ingredientes de una receta en el inventario
     * @param recipeId ID de la receta
     */
    async updateInventoryForRecipe(recipeId: number, quantity: number = 1): Promise<void> {
        const recipes = await IngredientRecipe.findAll({ where: { receta_id: recipeId } });

        if (!recipes) throw new Error("Recipe not found");
        if (recipes.length === 0) throw new Error("Recipe not found");

        for (const recipe of recipes) {
            const ingredient = await Ingredient.findOne({
                where: { id: recipe.dataValues?.ingrediente_id }
            });
            if (!ingredient) continue;

            const newQuantity = ingredient.dataValues?.cantidad - recipe.dataValues?.cantidad * quantity;
            if (newQuantity < 0) {
                throw new Error(`Not enough stock for ingredient: ${ingredient.dataValues?.nombre}`);
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