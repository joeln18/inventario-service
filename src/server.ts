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
import { InventarioController } from "./infraestructure/InventarioController";


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
const crearIngrediente = new CrearIngrediente(ingredienteRepo);
const validarDisponibilidadPedido = new ValidarDisponibilidadPedido(servicioValidacionDisponibilidad);
const actualizarInventarioPorPedido = new ActualizarInventarioPorPedido(servicioActualizarInventario);
// const crearReceta = new CrearReceta(recetaRepo);

// Controllers
const ingredienteController = new IngredienteController(obtenerIngredientes, crearIngrediente);
const inventarioController = new InventarioController(validarDisponibilidadPedido, actualizarInventarioPorPedido);


// Routes
app.get("/ingredientes", (req, res) => ingredienteController.obtenerTodos(req, res));
app.post("/ingredientes", (req, res) => ingredienteController.crear(req, res));
app.post("/inventario/validar", (req, res) => inventarioController.validarDisponibilidad(req, res));
app.post("/inventario/actualizar", (req, res) => inventarioController.actualizarInventario(req, res));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Microservicio de Inventario corriendo en http://localhost:${PORT}`);
});