import { Ingredient } from "../../domain/entities/Ingredient";

export class IngredientDTO {
    id: number;
    name: string;
    quantity: number;
    measureUnit: string;

    constructor(id: number, nombre: string, cantidad: number, unidad_medida_id: string) {
        this.id = id;
        this.name = nombre;
        this.quantity = cantidad;
        this.measureUnit = unidad_medida_id;
    }

    static fromModel(model: Ingredient): IngredientDTO {
        return new IngredientDTO(
            model.id,
            model.nombre,
            model.cantidad,
            model.unidad_medida_id
        );
    }

    static fromModelArray(models: any[]): IngredientDTO[] {
        return models.map((model) => IngredientDTO.fromModel(model));
    }
}