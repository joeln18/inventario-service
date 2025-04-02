export class Receta {
  constructor(
    public id: number,
    public nombre: string,
    public ingredientes: { idIngrediente: number; cantidad: number; unidadMedida: string }[]
  ) {}
}