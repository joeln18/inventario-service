import { Request, Response } from "express";
import { ObtenerIngredientes } from "../application/ObtenerIngrediente";

export class IngredienteController {
  constructor(private obtenerIngredientes: ObtenerIngredientes) {}

  async obtenerTodos(req: Request, res: Response) {
    const ingredientes = await this.obtenerIngredientes.ejecutar();
    res.json(ingredientes);
  }
}