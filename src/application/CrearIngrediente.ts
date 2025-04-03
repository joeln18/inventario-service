import { Ingrediente } from "../domain/entities/Ingrediente";
import { IngredienteRepository } from "../domain/repositories/IngredienteRepository";
import { Cantidad } from "../domain/valueobjects/Cantidad";
import { UnidadMedida } from "../domain/valueobjects/UnidadMedida";

export class CrearIngrediente {
  constructor(private ingredienteRepo: IngredienteRepository) {}

  async ejecutar(
    nombre: string,
    cantidadValor: number,
    unidadMedidaId: number,
    unidadMedidaNombre: string
  ): Promise<Ingrediente> {
    if (!nombre || !cantidadValor || !unidadMedidaNombre) {
      throw new Error("Todos los parámetros son obligatorios.");
    }

    const cantidad = new Cantidad(cantidadValor);
    const unidadMedida = new UnidadMedida(
      unidadMedidaId,
      unidadMedidaNombre
    );

    const nuevoIngrediente = new Ingrediente(
      0, // ID se asignará automáticamente
      nombre,
      cantidad,
      unidadMedida
    );

    await this.ingredienteRepo.guardar(nuevoIngrediente);

    return nuevoIngrediente;
  }
}