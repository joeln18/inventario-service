import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import { ingredienteDocs } from "./docs/ingrediente.docs";
import { inventarioDocs } from "./docs/inventario.docs";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Inventario API",
      version: "1.0.0",
      description: "API para gestionar inventario de ingredientes y recetas",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor local",
      },
    ],
    paths: {
      ...ingredienteDocs,
      ...inventarioDocs,
    },
  },
  apis: [],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export function setupSwagger(app: Express) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}