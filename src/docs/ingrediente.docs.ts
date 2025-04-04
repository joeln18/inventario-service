export const ingredienteDocs = {
  "/ingredientes": {
    get: {
      summary: "Obtiene todos los ingredientes",
      tags: ["Ingredientes"],
      responses: {
        200: {
          description: "Lista de ingredientes",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "number" },
                    nombre: { type: "string" },
                    cantidad: {
                      type: "object",
                      properties: {
                        valor: { type: "number" },
                      },
                    },
                    unidadMedida: {
                      type: "object",
                      properties: {
                        id: { type: "number" },
                        nombre: { type: "string" },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    post: {
      summary: "Crea un nuevo ingrediente",
      tags: ["Ingredientes"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                nombre: { type: "string" },
                cantidad: {
                  type: "object",
                  properties: {
                    valor: { type: "number" },
                  },
                },
                unidadMedida: {
                  type: "object",
                  properties: {
                    id: { type: "number" },
                    nombre: { type: "string" },
                  },
                },
              },
            },
          },
        },
      },
      responses: {
        201: { description: "Ingrediente creado" },
        400: { description: "Error en la petición" },
      },
    },
  },
};
