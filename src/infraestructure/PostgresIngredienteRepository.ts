
import { Pool } from "pg";
import { Ingrediente } from "../domain/entities/Ingrediente";
import { IngredienteRepository } from "../domain/repositories/IngredienteRepository";
import dotenv from "dotenv";
import { Cantidad } from "../domain/valueobjects/Cantidad";
import { UnidadMedida } from "../domain/valueobjects/UnidadMedida";

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
    const query = `
      SELECT i.id, i.nombre, i.cantidad, u.id as unidad_id, u.nombre as unidad_nombre
      FROM ingrediente i
      JOIN unidad_medida u ON i.unidad_medida_id = u.id
    `;

    const result = await this.pool.query(query);

    return result.rows.map(row =>
      new Ingrediente(
        row.id,
        row.nombre,
        new Cantidad(row.cantidad),
        new UnidadMedida(row.unidad_id, row.unidad_nombre)
      ));
  }

  async obtenerPorId(id: number): Promise<Ingrediente | null> {
    const query = `
      SELECT i.id, i.nombre, i.cantidad, u.id as unidad_id, u.nombre as unidad_nombre
      FROM ingrediente i
      JOIN unidad_medida u ON i.unidad_medida_id = u.id
      WHERE i.id = $1
    `;
    const result = await this.pool.query(query, [id]);

    if (result.rows.length === 0) return null;

    const row = result.rows[0];
    return new Ingrediente(
      row.id,
      row.nombre,
      new Cantidad(Number(row.cantidad)),
      new UnidadMedida(row.unidad_id, row.unidad_nombre)
    );
  }

  async actualizarCantidad(id: number, nuevaCantidad: Cantidad): Promise<void> {
    const query = `
      UPDATE ingrediente
      SET cantidad_ingrediente = $1
      WHERE id_ingrediente = $2
    `;
    await this.pool.query(query, [nuevaCantidad.getValor(), id]);
  }

  async guardar(ingrediente: Ingrediente): Promise<void> {
    const query = `
      INSERT INTO ingrediente (nombre, cantidad, unidad_medida_id)
      VALUES ($1, $2, $3)
      ON CONFLICT (nombre) DO UPDATE
      SET cantidad = $2, unidad_medida_id = $3
    `;
    await this.pool.query(query, [
      ingrediente.getNombre(),
      ingrediente.getCantidad().getValor(),
      ingrediente.getUnidadMedida().getId()
    ]);
  }

  async eliminar(id: number): Promise<void> {
    const query = `
      DELETE FROM ingrediente
      WHERE id = $1
    `;
    await this.pool.query(query, [id]);
  }
}