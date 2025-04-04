import { DataTypes, Model } from 'sequelize';
import Database from '../Database';

const sequelize = Database.getInstance();

class Recipe extends Model {}

Recipe.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        nombre: { type: DataTypes.STRING, allowNull: false, unique: true }
    },
    { sequelize, modelName: 'Recipe', tableName: 'receta', timestamps: false }
);

export default Recipe;