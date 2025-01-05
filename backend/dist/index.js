import express from 'express';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler.js';
import router from './routes.js';
// Configurações
const app = express();
const PORT = process.env.PORT || 3001;
//Middlewares
app.use(express.json());
app.use(cors());
//routes
app.use('/products', router);
//MiddleWare de erro
app.use(errorHandler);
//Servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando: http://localhost:${PORT}`);
});
