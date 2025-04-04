import { Request, Response } from "express";
import { ValidarDisponibilidadPedido } from "../application/ValidarDisponibilidadPedido";
import { ActualizarInventarioPorPedido } from "../application/ActualizarInventarioPorPedido";

export class InventarioController {
  constructor(
    private validarDisponibilidadPedido: ValidarDisponibilidadPedido,
    private actualizarInventarioPorPedido: ActualizarInventarioPorPedido
  ) {}
  async validarDisponibilidad(req: Request, res: Response): Promise<void> {
    const { idReceta } = req.body
    if (!idReceta) {
      res.status(400).json({
        success: false,
        error: "El idReceta es requerido"
      });
      return;
    }
    try {
      const disponibilidad = await this.validarDisponibilidadPedido.ejecutar(idReceta);
      res.status(200).json({
        success: true,
        disponibilidad
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido al validar disponibilidad";
      res.status(400).json({
        success: false,
        error: errorMessage
      });
    }
  }

  async actualizarInventario(req: Request, res: Response): Promise<void> {
    const { idReceta } = req.body
    if (!idReceta) {
      res.status(400).json({
        success: false,
        error: "El idReceta es requerido"
      });
      return;
    }
    try {
      await this.actualizarInventarioPorPedido.ejecutar(idReceta);
      res.status(200).json({
        success: true,
        message: "Inventario actualizado correctamente"
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido al actualizar inventario";
      res.status(400).json({
        success: false,
        error: errorMessage
      });
    }
  }

}