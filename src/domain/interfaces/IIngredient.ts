import { IngredientDTO } from "../../application/dtos/IngredientDTO";
import Ingredient from "../../infraestructure/database/models/IngredientModel";


export interface IIngredient {
    getAllIngredients(): Promise<IngredientDTO[]>;
    getIngredientById(id: number): Promise<Ingredient | null>;
    createIngredient(data: Partial<Ingredient>): Promise<Ingredient>;
    updateIngredient(id: number, data: Partial<Ingredient>): any;
    deleteIngredient(id: number): Promise<number>;
}