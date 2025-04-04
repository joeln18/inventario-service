export const inventarioDocs = {
  "/inventario/validar": {
    post: {
      summary: "Valida la disponibilidad de ingredientes para una receta",
      tags: ["Inventario"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["idReceta"],
              properties: {
                idReceta: {
                  type: "string",
                  example: "receta123"
                }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: "Disponibilidad validada exitosamente",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  disponibilidad: {
                    type: "boolean",
                    description: "Indica si los ingredientes están disponibles"
                  }
                }
              }
            }
          }
        },
        400: {
          description: "Error en la validación de disponibilidad",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  error: { type: "string" }
                }
              }
            }
          }
        }
      }
    }
  },
  "/inventario/actualizar": {
    post: {
      summary: "Actualiza el inventario según los ingredientes utilizados por una receta",
      tags: ["Inventario"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["idReceta"],
              properties: {
                idReceta: {
                  type: "string",
                  example: "receta123"
                }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: "Inventario actualizado correctamente",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  message: { type: "string" }
                }
              }
            }
          }
        },
        400: {
          description: "Error al actualizar el inventario",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  error: { type: "string" }
                }
              }
            }
          }
        }
      }
    }
  }
};
