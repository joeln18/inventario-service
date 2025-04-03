import { Pool } from 'pg';
import { RecetaRepository } from '../domain/repositories/RecetaRepository';
import { Receta } from '../domain/entities/Receta';
import dotenv from "dotenv";

dotenv.config();

export class PostgresRecetaRepository implements RecetaRepository {
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

  async obtenerTodos(): Promise<Receta[]> {
    const query = `
      SELECT r.id, r.nombre
      FROM receta r
    `;

    const result = await this.pool.query(query);
    return result.rows.map(row => new Receta(row.id, row.nombre, []));
  }
  async obtenerPorId(id: number): Promise<Receta | null> {
    const query = `
      SELECT r.id, r.nombre
      FROM receta r
      WHERE r.id = $1
    `;
    const result = await this.pool.query(query, [id]);

    if (result.rows.length === 0) return null;

    const row = result.rows[0];
    return new Receta(row.id, row.nombre, []);
  }
  async guardar(receta: Receta): Promise<void> {
    const query = `
      INSERT INTO receta (id, nombre)
      VALUES ($1, $2)
      ON CONFLICT (id) DO UPDATE SET nombre = EXCLUDED.nombre
    `;
    await this.pool.query(query, [receta.id, receta.nombre]);
  }
  async eliminar(id: number): Promise<void> {
    const query = `
      DELETE FROM receta
      WHERE id = $1
    `;
    await this.pool.query(query, [id]);
  }
}