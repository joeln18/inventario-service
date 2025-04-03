import { Ingrediente } from "../entities/Ingrediente";
import { Cantidad } from "../valueobjects/Cantidad";

export interface IngredienteRepository {
    obtenerTodos(): Promise<Ingrediente[]>;
    obtenerPorId(id: number): Promise<Ingrediente | null>;
    actualizarCantidad(id: number, nuevaCantidad: Cantidad): Promise<void>;
    guardar(ingrediente: Ingrediente): Promise<void>;
    eliminar(id: number): Promise<void>;
}