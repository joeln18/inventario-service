import { IngredienteRepository } from "../repositories/IngredienteRepository";
import { RecetaRepository } from "../repositories/RecetaRepository";
import { Cantidad } from "../valueobjects/Cantidad";

export class ServicioActualizacionInventario {
  constructor(
    private recetaRepository: RecetaRepository,
    private ingredienteRepository: IngredienteRepository
  ) {}

  async incrementarCantidad(
    idIngrediente: number,
    cantidadIncremento: Cantidad
  ): Promise<void> {
    const ingrediente = await this.ingredienteRepository.obtenerPorId(idIngrediente);
    if (!ingrediente) {
      throw new Error(`Ingrediente con ID ${idIngrediente} no encontrado.`);
    }

    ingrediente.agregarCantidad(cantidadIncremento);
    await this.ingredienteRepository.guardar(ingrediente);
  }

  async decrementarCantidad(
    idIngrediente: number,
    cantidadDecremento: Cantidad
  ): Promise<void> {
    const ingrediente = await this.ingredienteRepository.obtenerPorId(idIngrediente);
    if (!ingrediente) {
      throw new Error(`Ingrediente con ID ${idIngrediente} no encontrado.`);
    }

    ingrediente.removerCantidad(cantidadDecremento);
    await this.ingredienteRepository.guardar(ingrediente);
  }

  async actualizarCantidad(
    idIngrediente: number,
    nuevaCantidad: Cantidad
  ): Promise<void> {
    const ingrediente = await this.ingredienteRepository.obtenerPorId(idIngrediente);
    if (!ingrediente) {
      throw new Error(`Ingrediente con ID ${idIngrediente} no encontrado.`);
    }

    ingrediente.actualizarCantidad(nuevaCantidad);
    await this.ingredienteRepository.guardar(ingrediente);
  }

  async actualizarPorReceta(
    idReceta: number
  ): Promise<void> {
    const receta = await this.recetaRepository.obtenerPorId(idReceta);
    if (!receta) {
      throw new Error(`Receta con ID ${idReceta} no encontrada.`);
    }

    for (const ingrediente of receta.getIngredientes()) {
      const ingredienteExistente = await this.ingredienteRepository.obtenerPorId(ingrediente.idIngrediente);
      if (!ingredienteExistente) {
        throw new Error(`Ingrediente con ID ${ingrediente.idIngrediente} no encontrado.`);
      }
      await this.decrementarCantidad(ingrediente.idIngrediente, ingrediente.cantidad);
    }
  }
}