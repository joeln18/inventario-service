
import { Pool } from "pg";
import { Ingrediente } from "../domain/entities/Ingrediente";
import { IngredienteRepository } from "../domain/repositories/IngredienteRepository";
import dotenv from "dotenv";

dotenv.config();

export class PostgresIngredienteRepository implements IngredienteRepository {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        port: Number(process.env.DB_PORT),
    });
  }

  async obtenerTodos(): Promise<Ingrediente[]> {
    const result = await this.pool.query("SELECT * FROM ingrediente");
    return result.rows.map(row => new Ingrediente(row.id, row.nombre, row.cantidad, row.unidad_medida));
  }

  async obtenerPorId(id: number): Promise<Ingrediente | null> {
    const result = await this.pool.query("SELECT * FROM ingrediente WHERE id_ingrediente = $1", [id]);
    if (result.rows.length === 0) return null;
    const row = result.rows[0];
    return new Ingrediente(row.id_ingrediente, row.nombre_ingrediente, row.cantidad_ingrediente, row.unidad_medida);
  }

  async actualizarCantidad(id: number, nuevaCantidad: number): Promise<void> {
    await this.pool.query("UPDATE ingrediente SET cantidad_ingrediente = $1 WHERE id_ingrediente = $2", [
      nuevaCantidad,
      id,
    ]);
  }
}