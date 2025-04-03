import { Request, Response } from "express";
import { ObtenerIngredientes } from "../application/ObtenerIngrediente";
import { CrearIngrediente } from "../application/CrearIngrediente";

export class IngredienteController {
  constructor(
    private obtenerIngredientes: ObtenerIngredientes,
    private crearIngrediente: CrearIngrediente
  ) {}

  async obtenerTodos(req: Request, res: Response) {
    const ingredientes = await this.obtenerIngredientes.ejecutar();
    res.json(ingredientes);
  }

  async crear(req: Request, res: Response) {
    const { nombre, cantidadValor, unidadMedidaId, unidadMedidaNombre } = req.body;
    try {
      const ingrediente = await this.crearIngrediente.ejecutar(nombre, cantidadValor, unidadMedidaId, unidadMedidaNombre);
      res.status(201).json(ingrediente);
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
    }
  }
}