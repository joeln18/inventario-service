import express from 'express';
import router from './infraestructure/routes/inventoryRoutes';
import Database from './infraestructure/database/Database';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';

const app = express();
app.disable("x-powered-by");
app.use(express.json());

app.use('/api', router);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/ingredients', router);

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

Database.testConnection();

export { app as server };