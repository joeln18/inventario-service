import Recipe from "../../infraestructure/database/models/RecipeModel";


export interface IRecipe {
    getAllRecipes(): Promise<Recipe[]>;
    getRecipeById(id: number): Promise<Recipe | null>;
    createRecipe(data: Partial<Recipe>): Promise<Recipe>;
    updateRecipe(id: number, data: Partial<Recipe>): any;
    deleteRecipe(id: number): Promise<number>;
}