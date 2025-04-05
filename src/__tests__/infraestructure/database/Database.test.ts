import Database from '../../../infraestructure/database/Database';
import sequelize from '../../../infraestructure/database/config';

jest.mock('../../../infraestructure/database/config.ts', () => ({
    authenticate: jest.fn(),
}));

describe('Database', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return the same instance of Sequelize', () => {
        const instance1 = Database.getInstance();
        const instance2 = Database.getInstance();
        expect(instance1).toBe(instance2);
    });

    it('should call authenticate when testing the connection', async () => {
        const mockAuthenticate = jest.spyOn(sequelize, 'authenticate').mockResolvedValueOnce(undefined);
        await Database.testConnection();
        expect(mockAuthenticate).toHaveBeenCalledTimes(1);
    });

    it('should log an error if the connection fails', async () => {
        const mockError = new Error('Connection failed');
        jest.spyOn(sequelize, 'authenticate').mockRejectedValueOnce(mockError);
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

        await Database.testConnection();

        expect(consoleErrorSpy).toHaveBeenCalledWith('No se pudo conectar a la base de datos:', mockError);
    });
});
