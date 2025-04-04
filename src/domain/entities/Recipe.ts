export class Recipe {
  constructor(
    public id: number,
    public nombre: string,
    public ingredients: { idIngredient: number; quantity: number; meausureUnit: string }[]
  ) {}
}