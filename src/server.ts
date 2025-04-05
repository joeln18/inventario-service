import express from 'express';
import router from './infraestructure/routes/inventoryRoutes';
import Database from './infraestructure/database/Database';

const app = express();
app.disable("x-powered-by");
app.use(express.json());

app.use('/api', router);

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

Database.testConnection();

export { app as server };