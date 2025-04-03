import express from "express";
import cors from "cors";

// Repositories
import { PostgresIngredienteRepository } from "./infraestructure/PostgresIngredienteRepository";
import { PostgresRecetaRepository } from "./infraestructure/PostgresRecetaRepository";

// Services
import { ServicioValidacionDisponibilidad } from "./domain/services/ServicioValidacionDisponibilidad";
import { ServicioActualizacionInventario } from "./domain/services/ServicioActualizacionInventario";

// Use Cases
import { ObtenerIngredientes } from "./application/ObtenerIngrediente";
import { CrearReceta } from "./application/CrearReceta";
import { CrearIngrediente } from "./application/CrearIngrediente";
import { ValidarDisponibilidadPedido } from "./application/ValidarDisponibilidadPedido";
import { ActualizarInventarioPorPedido } from "./application/ActualizarInventarioPorPedido";

// Controllers
import { IngredienteController } from "./infraestructure/IngredienteController";


const app = express();
app.use(express.json());
app.use(cors());

// Repositories
const ingredienteRepo = new PostgresIngredienteRepository();
const recetaRepo = new PostgresRecetaRepository();

// Services
const servicioValidacionDisponibilidad = new ServicioValidacionDisponibilidad(recetaRepo, ingredienteRepo);
const servicioActualizarInventario = new ServicioActualizacionInventario(recetaRepo, ingredienteRepo);

// Use Cases
const obtenerIngredientes = new ObtenerIngredientes(ingredienteRepo);
const crearReceta = new CrearReceta(recetaRepo);
const crearIngrediente = new CrearIngrediente(ingredienteRepo);
const validarDisponibilidadPedido = new ValidarDisponibilidadPedido(servicioValidacionDisponibilidad);
const actualizarInventarioPorPedido = new ActualizarInventarioPorPedido(servicioActualizarInventario);

// Controllers
const ingredienteController = new IngredienteController(obtenerIngredientes);

// Routes
app.get("/ingredientes", (req, res) => ingredienteController.obtenerTodos(req, res));
app.post("/recetas", async (req, res) => {
  try {
    const { nombre, ingredientes } = req.body;
    const receta = await crearReceta.ejecutar(nombre, ingredientes);
    res.status(201).json(receta);
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
  }
});
app.post("/ingredientes", async (req, res) => {
  try {
    const { nombre, cantidadValor, unidadMedidaId, unidadMedidaNombre } = req.body;
    const ingrediente = await crearIngrediente.ejecutar(nombre, cantidadValor, unidadMedidaId, unidadMedidaNombre);
    res.status(201).json(ingrediente);
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
  }
});
app.post("/validar-disponibilidad", async (req, res) => {
  try {
    const { idReceta } = req.body;
    const disponibilidad = await validarDisponibilidadPedido.ejecutar(idReceta);
    res.status(200).json({ disponibilidad });
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
  }
});
app.post("/actualizar-inventario", async (req, res) => {
  try {
    const { idReceta } = req.body;
    await actualizarInventarioPorPedido.ejecutar(idReceta);
    res.status(200).json({ message: "Inventario actualizado correctamente." });
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Microservicio de Inventario corriendo en http://localhost:${PORT}`);
});