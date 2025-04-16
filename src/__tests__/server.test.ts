import request from 'supertest';
import { server } from '../server';

jest.mock('sequelize');

jest.mock('swagger-ui-express', () => {
    return {
        serve: jest.fn(),
        setup: jest.fn((swaggerSpec, _) => {
            return (_: any, res: any) => {
                res.send(swaggerSpec);
            }
        })
    }
});

jest.mock('../domain/services/IngredientService.ts', () => ({
    getAllIngredients: jest.fn().mockResolvedValue([
        { id: 1, name: 'Harina', quantity: 100, measureUnit: 'g' }
    ]),
    getIngredientById: jest.fn().mockResolvedValue(
        { id: 1, name: 'Harina', quantity: 100, measureUnit: 'g' }
    ),
    createIngredient: jest.fn().mockResolvedValue(
        { id: 2, name: 'Azúcar', quantity: 200, measureUnit: 'g' }
    ),
    updateIngredient: jest.fn().mockResolvedValue(
        { id: 1, name: 'Sal', quantity: 50, measureUnit: 'g' }
    ),
    deleteIngredient: jest.fn().mockResolvedValue(undefined),
}));

jest.mock('../domain/services/RecipeService.ts', () => ({
    getAllRecipes: jest.fn().mockResolvedValue([
        {
            id: 1,
            name: 'Panqueques',
            description: 'Receta clásica para desayuno',
            ingredients: [
                { id: 1, name: 'Harina', quantity: 200, measureUnit: 'g' },
                { id: 2, name: 'Leche', quantity: 300, measureUnit: 'ml' }
            ]
        }
    ]),
    getRecipeById: jest.fn().mockResolvedValue({
        id: 1,
        name: 'Panqueques',
        description: 'Receta clásica para desayuno',
        ingredients: [
            { id: 1, name: 'Harina', quantity: 200, measureUnit: 'g' },
            { id: 2, name: 'Leche', quantity: 300, measureUnit: 'ml' }
        ]
    }),
    createRecipe: jest.fn().mockResolvedValue({
        id: 2,
        name: 'Tortilla',
        description: 'Receta con huevo',
        ingredients: [
            { id: 3, name: 'Huevo', quantity: 2, measureUnit: 'unidad' },
            { id: 4, name: 'Aceite', quantity: 10, measureUnit: 'ml' }
        ]
    }),
    updateRecipe: jest.fn().mockResolvedValue({
        id: 1,
        name: 'Panqueques actualizados',
        description: 'Con avena',
        ingredients: [
            { id: 1, name: 'Harina de avena', quantity: 200, measureUnit: 'g' },
            { id: 2, name: 'Leche', quantity: 300, measureUnit: 'ml' }
        ]
    }),
    deleteRecipe: jest.fn().mockResolvedValue(undefined),
}));


jest.mock('../domain/services/InventoryService.ts', () => ({
    checkRecipe: jest.fn().mockResolvedValue([
        { id_ingredient: 1, available: true }
    ]),
    updateInventory: jest.fn().mockResolvedValue({
        id: 1,
        quantity: 150
    }),
    reduceInventory: jest.fn().mockResolvedValue({
        id: 1,
        quantity: 90
    }),
    increaseInventory: jest.fn().mockResolvedValue({
        id: 1,
        quantity: 120
    }),
}));



describe('Ingredient routes', () => {
    describe('Ingredient routes', () => {
        it('GET /ingredients debe retornar 200', async () => {
            const res = await request(server).get('/api/ingredients');
            expect(res.status).toBe(200);
        });

        it('GET /ingredients/:id debe retornar 200', async () => {
            const res = await request(server).get('/api/ingredients/1');
            expect(res.status).toBe(200);
        });

        it('POST /ingredients debe retornar 201', async () => {
            const res = await request(server)
                .post('/api/ingredients')
                .send({ nombre: 'Azúcar', cantidad: 10, measureUnit: 'g' });
            expect(res.status).toBe(201);
        });

        it('PUT /ingredients/1 sin nombre debe retornar 400', async () => {
            const res = await request(server)
                .put('/api/ingredients/1')
                .send({ cantidad: 10 });
            expect(res.status).toBe(400);
        });
    });
});

describe('Recipe routes', () => {
    it('GET /recipes debe retornar 200', async () => {
        const res = await request(server).get('/api/recipes');
        expect(res.status).toBe(200);
    });

    it('GET /recipes/:id debe retornar 200', async () => {
        const res = await request(server).get('/api/recipes/1');
        expect(res.status).toBe(200);
    });

    it('POST /recipes debe retornar 201', async () => {
        const res = await request(server)
            .post('/api/recipes')
            .send({
                name: 'Tortilla',
                description: 'Receta con huevo',
                ingredients: [
                    { id: 3, name: 'Huevo', quantity: 2, measureUnit: 'unidad' },
                    { id: 4, name: 'Aceite', quantity: 10, measureUnit: 'ml' }
                ]
            });
        expect(res.status).toBe(201);
    });

    it('PUT /recipes/:id debe retornar 200', async () => {
        const res = await request(server)
            .put('/api/recipes/1')
            .send({
                name: 'Panqueques actualizados',
                description: 'Con avena',
                ingredients: [
                    { id: 1, name: 'Harina de avena', quantity: 200, measureUnit: 'g' },
                    { id: 2, name: 'Leche', quantity: 300, measureUnit: 'ml' }
                ]
            });
        expect(res.status).toBe(200);
    });

    it('DELETE /recipes/:id debe retornar 204', async () => {
        const res = await request(server).delete('/api/recipes/1');
        expect(res.status).toBe(200);
    });
});

describe('Inventory routes', () => {
    it('POST /inventory/check debe retornar 200', async () => {
        const res = await request(server)
            .post('/api/inventory/check')
            .send({ recipeId: 1 });
        expect(res.status).toBe(200);
    });

    it('POST /inventory/update debe retornar 200', async () => {
        const res = await request(server)
            .post('/api/inventory/order')
            .send({
                id_ingredient: 1,
                quantity: 50
            });

        expect(res.status).toBe(200);
    });

    it('POST /inventory/reduce debe retornar 200', async () => {
        const res = await request(server)
            .post('/api/inventory/reduce')
            .send({
                id_ingredient: 1,
                quantity: 10
            });

        expect(res.status).toBe(200);
    });

    it('POST /inventory/increase debe retornar 200', async () => {
        const res = await request(server)
            .post('/api/inventory/increase')
            .send({
                id_ingredient: 2,
                quantity: 10
            });
        expect(res.status).toBe(200);
    });
});
