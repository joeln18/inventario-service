import { Router } from 'express';
import IngredientController from '../../application/controllers/IngredientController';
import InventoryController from '../../application/controllers/InventoryController';
import RecipeController from '../../application/controllers/RecipeController';

const router = Router();

router.get('/ingredients', IngredientController.getAll);
router.get('/ingredients/:id', IngredientController.getById);
router.post('/ingredients', IngredientController.create);
router.put('/ingredients/:id', IngredientController.update);
router.delete('/ingredients/:id', IngredientController.delete);

router.get('/recipes', RecipeController.getAll);
router.get('/recipes/:id', RecipeController.getById);
router.post('/recipes', RecipeController.create);
router.put('/recipes/:id', RecipeController.update);
router.delete('/recipes/:id', RecipeController.delete);

router.post('/inventory/check', InventoryController.checkAvailability);
router.post('/inventory/order', InventoryController.updateInventory);
router.post('/inventory/reduce', InventoryController.reduceInventory);
router.post('/inventory/increase', InventoryController.increaseInventory);

export default router;