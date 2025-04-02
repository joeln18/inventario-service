import { Ingrediente } from "../entities/Ingrediente";

export interface IngredienteRepository {
    obtenerTodos(): Promise<Ingrediente[]>;
    obtenerPorId(id: number): Promise<Ingrediente | null>;
    actualizarCantidad(id: number, nuevaCantidad: number): Promise<void>;
}