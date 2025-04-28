import express from 'express';
import router from './infraestructure/routes/inventoryRoutes';
import Database from './infraestructure/database/Database';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';
import Messages from './infraestructure/messages/Messages';

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

Database.testConnection();
Messages();

export { app as server };