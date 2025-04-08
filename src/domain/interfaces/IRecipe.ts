import { RecipeDTO } from "../../application/dtos/RecipeDTO";
import Recipe from "../../infraestructure/database/models/RecipeModel";


export interface IRecipe {
    getAllRecipes(): Promise<RecipeDTO[]>;
    getRecipeById(id: number): Promise<RecipeDTO | null>;
    createRecipe(data: Partial<RecipeDTO>): Promise<RecipeDTO>;
    updateRecipe(id: number, data: Partial<RecipeDTO>): Promise<RecipeDTO | null>;
    deleteRecipe(id: number): Promise<number>;
}