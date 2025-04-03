import { IngredienteRepository } from "../repositories/IngredienteRepository";
import { RecetaRepository } from "../repositories/RecetaRepository";
import { Cantidad } from "../valueobjects/Cantidad";

export class ServicioValidacionDisponibilidad {
    constructor(
      private recetaRepository: RecetaRepository,
      private ingredienteRepository: IngredienteRepository
    ) {}

    async verificarDisponibilidadIngrediente(
      ingredienteId: number,
      cantidadRequerida: Cantidad
    ): Promise<boolean> {
      const ingrediente = await this.ingredienteRepository.obtenerPorId(ingredienteId);
      if (!ingrediente) {
        throw new Error(`Ingrediente con ID ${ingredienteId} no encontrado.`);
      }
      return ingrediente.haySuficiente(cantidadRequerida);
    }

    async verificarDisponibilidadReceta(recetaId: number): Promise<boolean> {
      const receta = await this.recetaRepository.obtenerPorId(recetaId);
      if (!receta) {
        throw new Error(`Receta con ID ${recetaId} no encontrada.`);
      }

      for (const ingrediente of receta.getIngredientes()) {
        const disponible = await this.verificarDisponibilidadIngrediente(
          ingrediente.idIngrediente,
          ingrediente.cantidad
        );
        if (!disponible) {
          return false;
        }
      }
      return true;
    }
}