import { Sequelize } from 'sequelize';
import sequelize from './config';

class Database {
    private static instance: Sequelize;

    private constructor() {}

    public static getInstance(): Sequelize {
        if (!Database.instance) {
            Database.instance = sequelize;
        }
        return Database.instance;
    }

    public static async testConnection(): Promise<void> {
        try {
            await Database.getInstance().authenticate();
            console.log('Conexión a la base de datos establecida correctamente.');
        } catch (error) {
            console.error('No se pudo conectar a la base de datos:', error);
        }
    }
}

export default Database;