import { DataTypes, Model } from 'sequelize';
import Database from '../Database';

import Recipe from './RecipeModel';
import Ingredient from './IngredientModel';
import MeasureUnit from './MeasureUnitModel';

const sequelize = Database.getInstance();

class IngredientRecipe extends Model {}

IngredientRecipe.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        receta_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: Recipe, key: 'id' } },
        ingrediente_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: Ingredient, key: 'id' } },
        cantidad: { type: DataTypes.INTEGER, allowNull: false },
        unidad_medida_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: MeasureUnit, key: 'id' } }
    },
    { sequelize, modelName: 'IngredientRecipe', tableName: 'ingrediente_receta', timestamps: false }
);

// Relaciones
Ingredient.belongsTo(MeasureUnit, { foreignKey: 'unidad_medida_id' });
Recipe.belongsToMany(Ingredient, { through: IngredientRecipe, foreignKey: 'receta_id' });
Ingredient.belongsToMany(Recipe, { through: IngredientRecipe, foreignKey: 'ingrediente_id' });

export default IngredientRecipe;