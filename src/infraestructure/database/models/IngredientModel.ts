import { DataTypes, Model } from 'sequelize';
import Database from '../Database';
import UnidadMedida from './MeasureUnitModel';

const sequelize = Database.getInstance();

class Ingredient extends Model {}

Ingredient.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        nombre: { type: DataTypes.STRING, allowNull: false, unique: true },
        cantidad: { type: DataTypes.INTEGER, allowNull: false },
        unidad_medida_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: UnidadMedida, key: 'id' } }
    },
    { sequelize, modelName: 'Ingredient', tableName: 'ingrediente', timestamps: false }
);

export default Ingredient;