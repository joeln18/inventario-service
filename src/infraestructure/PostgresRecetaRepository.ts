import { Pool } from 'pg';
import { RecetaRepository } from '../domain/repositories/RecetaRepository';
import { Receta } from '../domain/entities/Receta';
import dotenv from "dotenv";
import { Cantidad } from '../domain/valueobjects/Cantidad';

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
      SELECT
        r.id AS receta_id,
        r.nombre AS receta_nombre,
        i.id AS ingrediente_id,
        i.nombre AS ingrediente_nombre,
        ir.cantidad,
        u.nombre AS unidad_medida
      FROM receta r
      JOIN ingrediente_receta ir ON r.id = ir.receta_id
      JOIN ingrediente i ON ir.ingrediente_id = i.id
      JOIN unidad_medida u ON ir.unidad_medida_id = u.id
      WHERE r.id = $1;
    `;
    const result = await this.pool.query(query, [id]);

    if (result.rows.length === 0) {
      return null;
    }
    const receta = new Receta(
      result.rows[0].receta_id,
      result.rows[0].receta_nombre,
      result.rows.map(row => ({
        idIngrediente: row.ingrediente_id,
        cantidad: new Cantidad(row.cantidad),
        unidadMedida: row.unidad_medida,
      })),
    );

    return receta;
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