import { IngredientDTO } from "../../application/dtos/IngredientDTO";
import Ingredient from "../../infraestructure/database/models/IngredientModel";


export interface IIngredient {
    getAllIngredients(): Promise<IngredientDTO[]>;
    getIngredientById(id: number): Promise<IngredientDTO | null>;
    createIngredient(data: Partial<IngredientDTO>): Promise<IngredientDTO>;
    updateIngredient(id: number, data: Partial<IngredientDTO>): Promise<IngredientDTO | null>;
    deleteIngredient(id: number): Promise<number>;
}