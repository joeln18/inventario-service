import { Receta } from "../domain/entities/Receta";
import { RecetaRepository } from "../domain/repositories/RecetaRepository";
import { Cantidad } from "../domain/valueobjects/Cantidad";

type ingredienteReceta = {
  idIngrediente: number;
  cantidad: number;
  unidadMedida: string;
};

export class CrearReceta {
  constructor(
    private readonly recetaRepository: RecetaRepository,
  ){}

  async ejecutar(
    nombre: string,
    ingredientes: ingredienteReceta[]
  ): Promise<Receta> {
    if (!nombre || !ingredientes) {
      throw new Error("Todos los parámetros son obligatorios.");
    }

    const receta = new Receta(
      0, // ID se asignará automáticamente
      nombre,
      ingredientes.map((ingrediente) => ({
        idIngrediente: ingrediente.idIngrediente,
        cantidad: new Cantidad(ingrediente.cantidad),
        unidadMedida: ingrediente.unidadMedida,
      }))
    );

    await this.recetaRepository.guardar(receta);

    return receta;
  }
}