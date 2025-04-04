import { DataTypes, Model } from 'sequelize';
import Database from '../Database';

const sequelize = Database.getInstance();

class MeasureUnit extends Model {}

MeasureUnit.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        nombre: { type: DataTypes.STRING, allowNull: false, unique: true }
    },
    { sequelize, modelName: 'MeasureUnit', tableName: 'unidad_medida', timestamps: false }
);

export default MeasureUnit;