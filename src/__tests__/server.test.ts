import request from 'supertest';
import { server } from '../server';

jest.mock('sequelize');

jest.mock('../domain/services/IngredientService.ts', () => ({
    getAllIngredients: jest.fn().mockResolvedValue([{ id: 1, nombre: 'Harina' }]),
    getIngredientById: jest.fn().mockResolvedValue({ id: 1, nombre: 'Harina' }),
    createIngredient: jest.fn().mockResolvedValue({ id: 2, nombre: 'Azúcar' }),
    updateIngredient: jest.fn().mockResolvedValue({ id: 1, nombre: 'Sal' }),
    deleteIngredient: jest.fn().mockResolvedValue(undefined),
}));

jest.mock('../domain/services/RecipeService.ts', () => ({
    getAllRecipes: jest.fn().mockResolvedValue([{}]),
    getRecipeById: jest.fn().mockResolvedValue({}),
    createRecipe: jest.fn().mockResolvedValue({ }),
    updateRecipe: jest.fn().mockResolvedValue({}),
    deleteRecipe: jest.fn().mockResolvedValue(undefined),
}));

jest.mock('../domain/services/InventoryService.ts', () => ({
    checkRecipe: jest.fn().mockResolvedValue([{}]),
    updateInventory: jest.fn().mockResolvedValue({}),
    reduceInventory: jest.fn().mockResolvedValue({}),
    increaseInventory: jest.fn().mockResolvedValue({}),
}));


describe('Ingredient routes', () => {
    it('GET /ingredients debe retornar 200', async () => {
        const res = await request(server).get('/api/ingredients');
        expect(res.status).toBe(200);
    });

    it('GET /ingredient by id debe retornar 200', async () => {
        const res = await request(server).get('/api/ingredients/1');
        expect(res.status).toBe(200);
    });
    it('GET /ingredient by id debe retornar 200', async () => {
        const res = await request(server)
            .post('/api/ingredients')
            .send({ nombre: 'Azúcar', cantidad: 10 });
        expect(res.status).toBe(200);
    });
    it('GET /ingredient update', async () => {
        const res = await request(server)
            .put('/api/ingredients/1')
            .send({ cantidad: 10 });
        expect(res.status).toBe(400);
    });

});
