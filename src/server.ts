import express from "express";
import cors from "cors";
import { PostgresIngredienteRepository } from "./infraestructure/PostgresIngredienteRepository";
import { ObtenerIngredientes } from "./application/ObtenerIngrediente";
import { IngredienteController } from "./infraestructure/IngredienteController";


const app = express();
app.use(express.json());
app.use(cors());

const ingredienteRepo = new PostgresIngredienteRepository();
const obtenerIngredientes = new ObtenerIngredientes(ingredienteRepo);
const ingredienteController = new IngredienteController(obtenerIngredientes);

app.get("/ingredientes", (req, res) => ingredienteController.obtenerTodos(req, res));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Microservicio de Inventario corriendo en http://localhost:${PORT}`);
});