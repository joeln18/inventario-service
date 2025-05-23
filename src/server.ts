import express from 'express';
import router from './infraestructure/routes/inventoryRoutes';
import Database from './infraestructure/database/Database';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';
import Messages from './infraestructure/messages/Messages';
import { SocketClient } from './infraestructure/socket/SocketClient';

const app = express();
app.disable("x-powered-by");
app.use(express.json());

app.use('/api', router);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/ingredients', router);

const PORT = process.env.PORT ?? 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const socketService = new SocketClient();

socketService.on('connect', () => {
    console.log('Connected to socket server');
});


setTimeout(() => {
  socketService.emit('mensaje', 'Hola desde inventory-service');
}, 2000);

Database.testConnection();
Messages();

export { app as server };