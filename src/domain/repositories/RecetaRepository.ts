import { Receta } from "../entities/Receta";

export interface RecetaRepository {
    obtenerTodos(): Promise<Receta[]>;
    obtenerPorId(id: number): Promise<Receta | null>;
    guardar(receta: Receta): Promise<void>;
    eliminar(id: number): Promise<void>;
}