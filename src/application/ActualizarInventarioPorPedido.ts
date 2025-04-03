import { ServicioActualizacionInventario } from "../domain/services/ServicioActualizacionInventario";

export class ActualizarInventarioPorPedido {
  constructor(
    private servicioActualizarInventario: ServicioActualizacionInventario
  ) {}
  async ejecutar(
    idReceta: number
  ): Promise<void> {
    if (!idReceta) {
      throw new Error("El ID de la receta es obligatorio.");
    }

    await this.servicioActualizarInventario.actualizarPorReceta(idReceta);
  }
}