import { IngredienteRepository } from "../domain/repositories/IngredienteRepository";

export class ObtenerIngredientes {
  constructor(private ingredienteRepo: IngredienteRepository) {}

  async ejecutar() {
    return await this.ingredienteRepo.obtenerTodos();
  }
}