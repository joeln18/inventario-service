import { Cantidad } from "../valueobjects/Cantidad";

export class Receta {
  constructor(
    public id: number,
    public nombre: string,
    public ingredientes: { idIngrediente: number; cantidad: Cantidad; unidadMedida: string }[]
  ) {}

  getId(): number {
    return this.id;
  }

  getNombre(): string {
    return this.nombre;
  }

  getIngredientes(): { idIngrediente: number; cantidad: Cantidad; unidadMedida: string }[] {
    return this.ingredientes;
  }

  agregarIngrediente(idIngrediente: number, cantidad: Cantidad, unidadMedida: string): void {
    this.ingredientes.push({ idIngrediente, cantidad, unidadMedida });
  }
}