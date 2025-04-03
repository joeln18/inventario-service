import { ServicioValidacionDisponibilidad } from "../domain/services/ServicioValidacionDisponibilidad";

export class ValidarDisponibilidadPedido {
  constructor(
    private servicioValidacionDisponibilidad: ServicioValidacionDisponibilidad
  ) {}
  async ejecutar(
    idReceta: number
  ): Promise<boolean> {
    if (!idReceta) {
      throw new Error("El ID de la receta es obligatorio.");
    }

    const disponibilidad = await this.servicioValidacionDisponibilidad.verificarDisponibilidadReceta(
      idReceta
    );

    return disponibilidad;
  }
}