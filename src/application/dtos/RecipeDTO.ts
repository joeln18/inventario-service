export class RecipeDTO {
    id: number;
    recipeName: string;
    ingredients: {
        id: number;
        name: string;
        quantity: number;
        measureUnit: string;
    }[];

    constructor(id: number, recipeName: string, ingredients: { id: number; name: string; quantity: number; measureUnit: string; }[]) {
        this.id = id;
        this.recipeName = recipeName;
        this.ingredients = ingredients;
    }
    static fromModel(model: any): RecipeDTO {
        return new RecipeDTO(
            model.id,
            model.nombre,
            model.ingredients.map((ingredient: any) => ({
                id: ingredient.id,
                name: ingredient.name,
                quantity: ingredient.quantity,
                measureUnit: ingredient.measureUnit
            }))
        );
    }
    static fromModelArray(models: any[]): RecipeDTO[] {
        return models.map((model) => RecipeDTO.fromModel(model));
    }
}